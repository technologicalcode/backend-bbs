import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { BarberoEntity } from '../barbero/entity/barbero.entity';
import { CitasEntity } from './entity/citas.entity';
import type {
  CitaDisponibleView,
  CitaGenerada,
} from './interfaces/citas.interface';
import type { ICitasWriter } from './interfaces/citas-writer.interface';
import { ESTADO_CITA_DISPONIBLE } from './constants/estado-cita.constants';
import { CitaHelper } from './helper/citas.helper';
import { BarberoService } from '../barbero/barbero.service';

@Injectable()
export class CitasService implements ICitasWriter {
  constructor(
    @InjectRepository(CitasEntity)
    private readonly citaRepository: Repository<CitasEntity>,
    private readonly citaHelper: CitaHelper,
    private readonly barberoService: BarberoService,
  ) {}

  async createCita(
    citas: CitaGenerada[],
    manager?: EntityManager,
  ): Promise<void> {
    if (citas.length === 0) {
      return;
    }

    const payload: Partial<CitasEntity>[] = citas.map((c) => ({
      id_bb: c.id_bb,
      id_cliente: null,
      fecha_cita: new Date(c.fecha),
      hora_cita_inicio: c.hora_cita_inicio,
      hora_cita_fin: c.hora_cita_fin,
      estado_cita: ESTADO_CITA_DISPONIBLE,
    }));

    const repo = manager
      ? manager.getRepository(CitasEntity)
      : this.citaRepository;

    await repo.save(payload);
  }

  async cargarCitas(): Promise<CitaDisponibleView[]> {
    //this.citaHelper.validarDt()
    const rows = await this.citaRepository
      .createQueryBuilder('ct')
      .innerJoin(BarberoEntity, 'bb', 'bb.id_bb = ct.id_bb')
      .select([
        'ct.id_cita',
        'ct.id_bb',
        'ct.id_cliente',
        'ct.fecha_cita',
        'ct.hora_cita_inicio',
        'ct.hora_cita_fin',
        'ct.estado_cita',
        'CONCAT(bb.nombre, " ", bb.apellido)',
        'bb.alias'
      ])
      .where('ct.estado_cita = :estado', {
        estado: ESTADO_CITA_DISPONIBLE,
      })
      .getRawMany<CitaDisponibleView>();

    return rows;
  }
}
