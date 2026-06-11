import { Injectable } from '@nestjs/common';
import {
  BloqueoHaDto,
  CreateHorarioAtencionDto,
} from '../dto/horario_atencion.dto';
export interface HorarioAtencionInsert {
  id_negocio: number;
  id_usuario: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  duracion_slot: number;
  tiempo_entre_slot: number;
  estado_ha: number;
}

export interface HorarioAtencionConBloqueos {
  horario: HorarioAtencionInsert;
  bloqueos?: BloqueoHaDto[];
}

export interface BloqueoHorarioInsert {
  id_horario_atencion: number;
  hora_inicio: string;
  hora_fin: string;
  motivo: string;
}

@Injectable()
export class HorarioAtencionEttra {
  public estructuraHorarioAtencion(
    dto: CreateHorarioAtencionDto,
  ): HorarioAtencionConBloqueos[] {
    const aDevolver: HorarioAtencionConBloqueos[] = [];
        for(const em of dto.empleados){
            for(const patron of em.Patron){
                 //extraccion de datos para creacio de horarios por linea de acuerdo a cantidad de fechas en las que se repetira el mismo patron 
                const fechas_a_crear = [patron.fecha, ...patron.repetir_en_fechas]
                for(const f of fechas_a_crear){
                    const horario: HorarioAtencionInsert = {
                        id_negocio: dto.id_negocio,
                        id_usuario: em.id_usuario!,
                        fecha: f,
                        hora_inicio: patron.hora_inicio,
                        hora_fin: patron.hora_fin,
                        duracion_slot: dto.duracion_slot,
                        tiempo_entre_slot: dto.tiempo_entre_slot,
                        estado_ha:1
                    };
                    aDevolver.push({horario,bloqueos:patron.bloqueos});
                }
            }
        }
        return aDevolver;
    }

    public estructuraBloqueosHorario(
        bloqueos: BloqueoHaDto[],
        id_horario_atencion: number,
    ): BloqueoHorarioInsert[] {
        const aDevolver: BloqueoHorarioInsert[] = [];
        if(bloqueos.length > 0){
        for(const b of bloqueos){
            aDevolver.push({
                id_horario_atencion,
                hora_inicio: b.hora_inicio,
                hora_fin: b.hora_fin,
                motivo: b.motivo,
            })
        }
      }
        return aDevolver;
    }
}