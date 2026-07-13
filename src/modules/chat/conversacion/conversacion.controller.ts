import { Controller, Get, Param, ParseEnumPipe, Query } from '@nestjs/common';
import { CanalChat } from '../constants/canal-chat';
import { ConversacionService } from './conversacion.service';

@Controller('chat/conversaciones')
export class ConversacionController {
  constructor(private readonly conversacionService: ConversacionService) {}

}
