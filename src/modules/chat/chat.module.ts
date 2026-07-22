import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from '../clientes/cliente/entity/cliente.entity';
import { NegocioEntity } from '../negocio/entity/negocio.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConversacionController } from './conversacion/conversacion.controller';
import { ConversacionService } from './conversacion/conversacion.service';
import { ConversacionEntity } from './entity/conversacion.entity';
import { WhatsAppController } from './whatsApp/whatsApp.controller';
import { WebhookController } from './webhook/webhook.controller';
import { WhatsAppService } from './whatsApp/whatsApp.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConversacionEntity,
      ClienteEntity,
      NegocioEntity,
    ]),
  ],
  controllers: [
    ChatController
   ,ConversacionController
   ,WhatsAppController
   ,WebhookController
  ],
  providers: [
    ChatService,
    WhatsAppService,
    ConversacionService],
  exports: [
    ConversacionService,
    WhatsAppService,
   TypeOrmModule],
})
export class ChatModule {}
