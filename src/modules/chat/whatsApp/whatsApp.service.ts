import { Injectable } from "@nestjs/common";

@Injectable()
export class WhatsAppService {


 async ServerWebhookWhatsApp(body: any) {
  console.log('se ejecuto el webhook de whatsApp');
  console.log('body',body);
  console.log('body.entry',body.entry);
  console.log('body.entry[0].changes',body.entry[0].changes);
  console.log('body.entry[0].changes[0]',body.entry[0].changes[0]);
  console.log('body.entry[0].changes[0].value',body.entry[0].changes[0].value);
  console.log('body.entry[0].changes[0].value.contacts',body.entry[0].changes[0].value.contacts);
  console.log('body.entry[0].changes[0].value.messages',body.entry[0].changes[0].value.messages);
 }

}