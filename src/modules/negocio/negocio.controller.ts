import { Controller } from '@nestjs/common';
import { NegocioService } from './negocio.service';

@Controller('negocio')
export class NegocioController {
  constructor(private readonly negocioService: NegocioService) {}
}
