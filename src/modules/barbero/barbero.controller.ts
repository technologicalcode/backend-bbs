import { Body, Controller, Post } from '@nestjs/common';
import { BarberoService } from './barbero.service';
import { CreateBarberoDto } from './dto/barbero.dto';

@Controller('barbero')
export class BarberoController {
  constructor(private readonly barberoSrv: BarberoService) {}

  @Post('create')
  createBarbero(@Body() barbero: CreateBarberoDto) {
    return this.barberoSrv.createBarbero(barbero);
  }
  
}
