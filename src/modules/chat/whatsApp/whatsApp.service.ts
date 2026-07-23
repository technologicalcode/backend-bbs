import { Injectable } from "@nestjs/common";

@Injectable()
export class WhatsAppService {


 async ServerWebhookWhatsApp(body: any) {
  console.log('se ejecuto el webhook de whatsApp');
  console.log(body.entry[0].changes[0]);
  console.log(body.entry[0].changes[0].value.messages[0]);
 }

}