import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarberoEntity } from './entity/barbero.entity';
import { CreateBarberoDto } from './dto/barbero.dto';

@Injectable()
export class BarberoService {
  constructor(
    @InjectRepository(BarberoEntity)
    private readonly barberoRepository: Repository<BarberoEntity>,
  ) {}

  async createBarbero(barbero: CreateBarberoDto) {
    console.log(barbero);
    const newBarbero = this.barberoRepository.create(barbero);
    return this.barberoRepository.save(newBarbero);
  }
}
