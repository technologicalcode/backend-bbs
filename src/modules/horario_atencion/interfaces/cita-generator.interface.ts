import type { CitaGenerada } from 'src/modules/citas/interfaces/citas.interface';
import type { estructuraHorarioAtencion } from './horario_atencion.interface';

export interface ICitaGenerator {
  generar(horarios: estructuraHorarioAtencion[]): CitaGenerada[];
}
