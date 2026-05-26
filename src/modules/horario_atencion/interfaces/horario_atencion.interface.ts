export interface estructuraHorarioAtencion {
  id_bb: number;
  hora_inicio?: string | null;
  hora_fin?: string | null;
  fecha: string;
  estado_ha: number;
  horas_ausencia_inicio?: string | null;
  horas_ausencia_fin?: string | null;
  tiempo_proceso?: string | null;
}
