import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NegocioPlanEntity } from '../entity/negocio_plan.entity';

@Injectable()
export class NegocioPlanService {
  constructor(
    @InjectRepository(NegocioPlanEntity)
    private readonly negocioPlanRepo: Repository<NegocioPlanEntity>,
  ) {}
}
