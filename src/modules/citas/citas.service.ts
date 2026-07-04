import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
//import { BarberoEntity } from '../barbero/entity/barbero.entity';
import { CitasEntity } from './entity/citas.entity';
import type {
  CitaDisponibleView,
  CitaGenerada,
} from './interfaces/citas.interface';
import type { ICitasWriter } from './interfaces/citas-writer.interface';
import { CitaHelper } from './helper/citas.helper';
//import { BarberoService } from '../barbero/barbero.service';
import { UsuariosEntity } from '../usuarios/entity/usuarios.entity';

@Injectable()
export class CitasService implements ICitasWriter {
  constructor(
    @InjectRepository(CitasEntity)
    private readonly citaRepository: Repository<CitasEntity>,
    private readonly citaHelper: CitaHelper,
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepository: Repository<UsuariosEntity>,
  ) {}

  async createCita(): Promise<void> {
    
  }
    
}
