import { CitaGenerada } from 'src/modules/citas/interfaces/citas.interface';
import type { estructuraHorarioAtencion } from '../interfaces/horario_atencion.interface';

/** Cita/slot generado a partir del tiempo disponible del horario. */

type IntervaloMinutos = { inicio: number; fin: number };

function timeToMinutes(time: string): number {
  const [h = '0', m = '0', s = '0'] = time.trim().split(':');
  return (
    parseInt(h, 10) * 60 + parseInt(m, 10) + Math.floor(parseInt(s, 10) / 60)
  );
}

function minutesToTime(minutes: number): string {
  const total = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`;
}

function intervalosDisponibles(
  inicio: number,
  fin: number,
  ausenciaInicio?: string | null,
  ausenciaFin?: string | null,
): IntervaloMinutos[] {
  if (inicio >= fin) {
    return [];
  }

  if (ausenciaInicio == null || ausenciaFin == null) {
    return [{ inicio, fin }];
  }

  const aInicio = timeToMinutes(ausenciaInicio);
  const aFin = timeToMinutes(ausenciaFin);

  if (aInicio >= aFin) {
    return [{ inicio, fin }];
  }

  const bloqueoInicio = Math.max(inicio, aInicio);
  const bloqueoFin = Math.min(fin, aFin);

  if (bloqueoInicio >= bloqueoFin) {
    return [{ inicio, fin }];
  }

  const tramos: IntervaloMinutos[] = [];
  if (inicio < bloqueoInicio) {
    tramos.push({ inicio, fin: bloqueoInicio });
  }
  if (bloqueoFin < fin) {
    tramos.push({ inicio: bloqueoFin, fin });
  }
  return tramos;
}

function slotsEnIntervalo(
  tramo: IntervaloMinutos,
  duracionMin: number,
): IntervaloMinutos[] {
  const slots: IntervaloMinutos[] = [];
  if (duracionMin <= 0) {
    return slots;
  }

  let inicio = tramo.inicio;
  while (inicio + duracionMin <= tramo.fin) {
    slots.push({ inicio, fin: inicio + duracionMin });
    inicio += duracionMin;
  }
  return slots;
}

/**
 * Genera las horas de cita posibles según hora_inicio, hora_fin,
 * horas de ausencia y tiempo_proceso de cada horario de atención.
 */
export function generarCitas(
  horarios: estructuraHorarioAtencion[],
): CitaGenerada[] {
  const citas: CitaGenerada[] = [];

  for (const horario of horarios) {
    const { hora_inicio, hora_fin, tiempo_proceso, fecha, id_usuario } = horario;

    if (
      hora_inicio == null ||
      hora_fin == null ||
      tiempo_proceso == null ||
      !fecha
    ) {
      continue;
    }

    const inicioJornada = timeToMinutes(hora_inicio);
    const finJornada = timeToMinutes(hora_fin);
    const duracionMin = timeToMinutes(tiempo_proceso);

    if (inicioJornada >= finJornada || duracionMin <= 0) {
      continue;
    }

    const tramos = intervalosDisponibles(
      inicioJornada,
      finJornada,
      horario.horas_ausencia_inicio,
      horario.horas_ausencia_fin,
    );

    for (const tramo of tramos) {
      const slots = slotsEnIntervalo(tramo, duracionMin);
      for (const slot of slots) {
        citas.push({
          id_usuario,
          fecha,
          hora_cita_inicio: minutesToTime(slot.inicio),
          hora_cita_fin: minutesToTime(slot.fin),
        });
      }
    }
  }

  return citas;
}
