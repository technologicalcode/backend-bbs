import { Controller, Get, Param } from '@nestjs/common';
import { ConversacionWspService } from './conversacion_wsp.service';

@Controller('whatsapp/conversaciones')
export class ConversacionWspController {
  constructor(
    private readonly conversacionWspService: ConversacionWspService,
  ) {}

  @Get('cliente/:idCliente')
  findByCliente(@Param('idCliente') idCliente: string) {
    return this.conversacionWspService.findByCliente(+idCliente);
  }

  @Get('negocio/:idNegocio')
  findByNegocio(@Param('idNegocio') idNegocio: string) {
    return this.conversacionWspService.findByNegocio(+idNegocio);
  }

  @Get('numero/:numero')
  findByNumero(@Param('numero') numero: string) {
    return this.conversacionWspService.findByNumero(numero);
  }
}
