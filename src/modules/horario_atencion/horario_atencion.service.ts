import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import type { CreateHorarioAtencionDto } from './dto/horario_atencion.dto';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';
import { HORARIO_ATENCION_MESSAGES } from './interface/horario_atencion.messages';
import { CitasService } from '../citas/citas.service';
import { generarCitas } from './helper/horario_atecion.helper';

@Injectable()
export class HorarioAtencionService {
  private readonly logger = new Logger(HorarioAtencionService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly citasService: CitasService,
  ) {}

  async createHorarioAtencion(
    dto: CreateHorarioAtencionDto[],
    idbb: number,
  ): Promise<ApiResponse> {
    if (!dto?.length) {
      return {
        status: false,
        message: HORARIO_ATENCION_MESSAGES.EMPTY_PAYLOAD,
        data: null,
      };
    }

    const registerData = dto.map((item) => ({
      ...item,
      fecha: new Date(item.fecha),
      id_bb: idbb,
    }));

    const horariosParaCitas = dto.map((item) => ({
      ...item,
      id_bb: idbb,
    }));

    try {
      await this.dataSource.transaction(async (manager) => {
        await manager.getRepository(HorarioAtencionEntity).save(registerData);

        const listaCitas = generarCitas(horariosParaCitas);
        if (listaCitas.length === 0) {
          this.logger.warn(
            'No se generaron citas: revisa hora_inicio, hora_fin y tiempo_proceso',
          );
        }

        await this.citasService.createCita(listaCitas, manager);
      });

      return {
        status: true,
        message: HORARIO_ATENCION_MESSAGES.SUCCESS,
        data: null,
      };
    } catch (error) {
      this.logger.error('Error al guardar horarios de atención', error);
      return {
        status: false,
        message: HORARIO_ATENCION_MESSAGES.SAVE_ERROR,
        data: null,
      };
    }
  }
}
