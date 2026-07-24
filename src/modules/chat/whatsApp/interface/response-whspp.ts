export interface ResponseWhsppV25 {
 object:string;
 entry:Entry[];
}

 interface Entry {
  id:string;
  changes:Changes[];
 }

interface Changes {
 value:ValueChanges;
 field:string;
}

interface ValueChanges {
 messaging_product:string;
 metadata:metadataValueChanges;
 contacts:contactsValueChanges[];
 messages:messagesValueChanges[];
}

interface metadataValueChanges{
 display_phone_number:string;
 phone_number_id:string;
} 

interface contactsValueChanges{
 profile:profileContacts;
 wa_id:string;
 user_id:string;
}

interface profileContacts{
 name:string;
}

interface messagesValueChanges{
 from: string;
 from_user_id:string;
 id:string;
 timestamp:string;
 text?:textValueChanges;
 audio?:audioValueChanges;
 reaction?:reactionValueChanges;
 image?:imageValueChanges;
 type: 'text' | 'image' | 'audio' | 'video' | 'document' | 'sticker' | 'location' | 'contacts' | 'interactive' | 'button' | 'reaction';
}

interface textValueChanges{
 body:string;
}

interface reactionValueChanges{
 message_id:string;
 emoji:string;
}

interface audioValueChanges{
 mime_type:string;
 sha256:string;
 id:string;
 url:string;
 voice:boolean;
}

interface imageValueChanges{
 mime_type:string;
 sha256:string;
 id:string;
 url:string;
}