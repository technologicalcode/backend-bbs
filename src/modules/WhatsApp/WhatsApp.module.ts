import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../clientes/cliente/entity/cliente.entity';
import { NegocioEntity } from '../negocio/entity/negocio.entity';
import { WhatsAppController } from './WhatsApp.controller';
import { WhatsAppService } from './WhatsApp.service';
import { ConversacionWspController } from './conversacion_wsp/conversacion_wsp.controller';
import { ConversacionWspService } from './conversacion_wsp/conversacion_wsp.service';
import { ConversacionWspEntity } from './entity/conversacion_wsp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConversacionWspEntity,
      ClienteEntity,
      NegocioEntity,
    ]),
  ],
  controllers: [WhatsAppController, ConversacionWspController],
  providers: [WhatsAppService, ConversacionWspService],
  exports: [ConversacionWspService, TypeOrmModule],
})
export class WhatsAppModule {}
