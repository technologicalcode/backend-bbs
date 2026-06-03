import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanPermisoEntity } from '../entity/plan_permiso.entity';

@Injectable()
export class PlanPermisoService {
  constructor(
    @InjectRepository(PlanPermisoEntity)
    private readonly planPermisoRepo: Repository<PlanPermisoEntity>,
  ) {}
}
