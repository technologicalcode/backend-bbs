import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiResponse } from 'src/core/interface/api-response';
import { CITA_GENERATOR, CITAS_WRITER } from 'src/core/tokens/injection.tokens';
import type { ICitasWriter } from '../citas/interfaces/citas-writer.interface';
import type { CreateHorarioAtencionDto } from './dto/horario_atencion.dto';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';
import { HORARIO_ATENCION_MESSAGES } from './interfaces/horario_atencion.messages';
import type { ICitaGenerator } from './interfaces/cita-generator.interface';

@Injectable()
export class HorarioAtencionService {
  private readonly logger = new Logger(HorarioAtencionService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @Inject(CITA_GENERATOR)
    private readonly citaGenerator: ICitaGenerator,
    @Inject(CITAS_WRITER)
    private readonly citasWriter: ICitasWriter,
  ) {}

  async createHorarioAtencion(
    dto: CreateHorarioAtencionDto[],
    idbb: number,
  ): Promise<ApiResponse<null>> {
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

        const listaCitas = this.citaGenerator.generar(horariosParaCitas);
        if (listaCitas.length === 0) {
          this.logger.warn(
            'No se generaron citas: revisa hora_inicio, hora_fin y tiempo_proceso',
          );
        }

        await this.citasWriter.createCita(listaCitas, manager);
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
