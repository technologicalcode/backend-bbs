import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { CanalChat } from '../constants/canal-chat';
import { ConversacionEntity } from '../entity/conversacion.entity';

@Injectable()
export class ConversacionService {
  
}
