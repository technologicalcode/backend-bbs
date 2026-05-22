import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CitasEntity } from './entity/citas.entity';
import type { CitaGenerada } from './interface/citas.interface';

const ESTADO_CITA_DISPONIBLE = 'DISPONIBLE';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(CitasEntity)
    private readonly citaRepository: Repository<CitasEntity>,
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

  async CargarCitas(){
    const citas = await this.citaRepository.find();
    return citas;
  }
}
