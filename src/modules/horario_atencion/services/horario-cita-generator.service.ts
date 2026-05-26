import { Injectable } from '@nestjs/common';
import { generarCitas } from '../helper/horario_atecion.helper';
import type { ICitaGenerator } from '../interfaces/cita-generator.interface';
import type { estructuraHorarioAtencion } from '../interfaces/horario_atencion.interface';
import type { CitaGenerada } from 'src/modules/citas/interfaces/citas.interface';

@Injectable()
export class HorarioCitaGeneratorService implements ICitaGenerator {
  generar(horarios: estructuraHorarioAtencion[]): CitaGenerada[] {
    return generarCitas(horarios);
  }
}
