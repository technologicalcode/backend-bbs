import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { WhatsAppService } from "../whatsApp/whatsApp.service";
import { Public } from "src/auth/decorators/public.decorator";
import { Response } from "express";

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
  
  @Get('whatsApp')
  async VerifyTokenWhatsApp(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: any,
  ) {
    if (
      mode === 'subscribe' &&
      token === process.env.WEBHOOK_VERIFY_TOKEN
    ) {
      return res.status(200).send(challenge);
    }
  
    return res.sendStatus(403);
  }
  
}