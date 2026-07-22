import { Body, Controller, Post } from "@nestjs/common";
import { WhatsAppService } from "../whatsApp/whatsApp.service";
import { Public } from "src/auth/decorators/public.decorator";

@Controller('webhook')
@Public()
export class WebhookController {
  constructor(
    private readonly whatsAppService: WhatsAppService,
  ){}
  
  @Post('whatsApp')
  async whatsAppWebhook(@Body() body: any) {
    return this.whatsAppService.ServerWebhookWhatsApp(body);
  }
  
}