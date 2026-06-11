import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateHorarioAtencionDto } from './dto/horario_atencion.dto';
import { verificarIndependiente } from './helper/horario_atecion.helper';
import { HorarioAtencionEttra } from './helper/horario_atentencio_ettra';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';
import { BloqueosHorarioEntity } from './entity/bloqueos_horario.entity';

@Injectable()
export class HorarioAtencionService {
  private readonly logger = new Logger(HorarioAtencionService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    readonly horarioAtencionEttra: HorarioAtencionEttra
  ) {}

  async createHorarioAtencion(
    dto: CreateHorarioAtencionDto,
    idUsuario: number,
  ): Promise<void> {
    const dtoVerificado = verificarIndependiente(dto, idUsuario);
    const horariosAInsertar =
      this.horarioAtencionEttra.estructuraHorarioAtencion(dtoVerificado);

    if (horariosAInsertar.length === 0) {
      throw new BadRequestException('No se generaron horarios para insertar');
    }

    try {
      await this.dataSource.transaction(async (manager) => {
        for (const h of horariosAInsertar) {
          const resultado = await manager.insert(
            HorarioAtencionEntity,
            h.horario,
          );
          const idHorarioAtencion = resultado.identifiers[0]
            ?.id_horario_atencion as number | undefined;

          if (!idHorarioAtencion) {
            throw new InternalServerErrorException(
              'No se pudo obtener el id del horario insertado',
            );
          }

          const bloqueos = this.horarioAtencionEttra.estructuraBloqueosHorario(
            h.bloqueos ?? [],
            idHorarioAtencion,
          );

          if (bloqueos.length > 0) {
            await manager.insert(BloqueosHorarioEntity, bloqueos);
          }
        }
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Error al crear horarios de atención', error);
      throw new InternalServerErrorException(
        'No se pudieron crear los horarios de atención',
      );
    }
  }
}
