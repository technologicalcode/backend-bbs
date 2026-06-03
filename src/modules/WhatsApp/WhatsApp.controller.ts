import { Controller } from '@nestjs/common';
import { WhatsAppService } from './WhatsApp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsAppService: WhatsAppService) {}
}
