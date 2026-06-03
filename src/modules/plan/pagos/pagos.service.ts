import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagosEntity } from '../entity/pagos.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(PagosEntity)
    private readonly pagosRepo: Repository<PagosEntity>,
  ) {}
}
