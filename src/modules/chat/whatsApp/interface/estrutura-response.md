# Estructura del webhook de WhatsApp

Payload que llega a `POST /api/webhook/whatsApp` cuando Meta envía un evento.

## Cómo leerlo (ruta rápida)

```text
body
 └─ entry[0]
     └─ changes[0]
         ├─ field          → siempre "messages" en estos ejemplos
         └─ value
             ├─ metadata   → número del negocio (nosotros)
             ├─ contacts   → quién escribe
             └─ messages   → el mensaje (texto / reacción / audio…)
```

**Datos útiles en la práctica:**

| Campo | Ruta | Ejemplo |
|-------|------|---------|
| Teléfono del negocio | `value.metadata.display_phone_number` | `51934924158` |
| ID del número en Meta | `value.metadata.phone_number_id` | `1370590109460934` |
| Teléfono del cliente | `value.messages[0].from` | `51983446294` |
| Nombre del contacto | `value.contacts[0].profile.name` | `.` |
| Tipo de mensaje | `value.messages[0].type` | `text` / `reaction` / `audio` / `image` |
| ID del mensaje | `value.messages[0].id` | `wamid....` |

En código TypeScript suele accederse así:

```ts
const value = body.entry[0].changes[0].value;
const mensaje = value.messages[0];
const tipo = mensaje.type; // 'text' | 'reaction' | 'audio' | 'image' | ...
```

---

## Envoltorio común (igual en todos los tipos)

```json
{
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": "1862416851396118",
      "changes": [
        {
          "field": "messages",
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": "51934924158",
              "phone_number_id": "1370590109460934"
            },
            "contacts": [
              {
                "profile": { "name": "." },
                "wa_id": "51983446294",
                "user_id": "PE.1393817546000775"
              }
            ],
            "messages": [ /* cambia según el tipo */ ]
          }
        }
      ]
    }
  ]
}
```

A partir de aquí solo cambia el contenido de `messages[0]`.

---

## 1. Mensaje de texto (`type: "text"`)

```json
{
  "from": "51983446294",
  "from_user_id": "PE.1393817546000775",
  "id": "wamid.HBgLNTE5ODM0NDYyOTQVAgASGBYzRUIwNUVGN0Y2OTI1MzM3RTgwRjREAA==",
  "timestamp": "1784857494",
  "type": "text",
  "text": {
    "body": "hola techCode"
  }
}
```

| Campo | Uso |
|-------|-----|
| `text.body` | Texto que escribió el cliente |
| `timestamp` | Unix (segundos) |

---

## 2. Reacción (`type: "reaction"`)

```json
{
  "from": "51983446294",
  "from_user_id": "PE.1393817546000775",
  "id": "wamid.HBgLNTE5ODM0NDYyOTQVAgASGBQzQUYzNUM3Q0I0NUVCNjNFQjE4RAA=",
  "timestamp": "1784858336",
  "type": "reaction",
  "reaction": {
    "message_id": "wamid.HBgLNTE5ODM0NDYyOTQVAgARGBJBMTFENTJCNjczMjY2QUE0REUA",
    "emoji": "👍"
  }
}
```

| Campo | Uso |
|-------|-----|
| `reaction.emoji` | Emoji de la reacción |
| `reaction.message_id` | Mensaje al que reaccionó |

---

## 3. Audio / nota de voz (`type: "audio"`)

```json
{
  "from": "51983446294",
  "from_user_id": "PE.1393817546000775",
  "id": "wamid.HBgLNTE5ODM0NDYyOTQVAgASGBQzQUU3NUM0NTBBMEE4OEYyQ0Y5RgA=",
  "timestamp": "1784858429",
  "type": "audio",
  "audio": {
    "mime_type": "audio/ogg; codecs=opus",
    "sha256": "iGmmjWxIkzVu8gtMrgDCEOAuzjwh3Jjj0+yvsYZOkP4=",
    "id": "1467894285099634",
    "url": "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=...",
    "voice": true
  }
}
```

| Campo | Uso |
|-------|-----|
| `audio.id` | ID del archivo (para descargarlo con la API de Media) |
| `audio.url` | URL temporal del adjunto |
| `audio.voice` | `true` = nota de voz |
| `audio.mime_type` | Formato del audio |

---

## 4. Imagen (`type: "image"`)

```json
{
  "from": "51983446294",
  "from_user_id": "PE.1393817546000775",
  "id": "wamid.HBgLNTE5ODM0NDYyOTQVAgASGBYzRUIwNTRERDg1MjMxOUQ3MzIxNDJGAA==",
  "timestamp": "1784861718",
  "type": "image",
  "image": {
    "mime_type": "image/jpeg",
    "sha256": "PHz1wT1XKnbPlcmtgpuwQCZXOP+A+B5v4wiI8ril86M=",
    "id": "1359266188978960",
    "url": "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=..."
  }
}
```

| Campo | Uso |
|-------|-----|
| `image.id` | ID del archivo (descarga con la API de Media) |
| `image.url` | URL temporal del adjunto |
| `image.mime_type` | Formato (`image/jpeg`, `image/png`, …) |
| `image.sha256` | Hash del archivo |
| `image.caption` | (opcional) texto debajo de la imagen, si el cliente lo envió |

---

## Resumen por tipo

| `type` | Dónde está el contenido |
|--------|-------------------------|
| `text` | `messages[0].text.body` |
| `reaction` | `messages[0].reaction.emoji` + `message_id` |
| `audio` | `messages[0].audio.id` / `url` |
| `image` | `messages[0].image.id` / `url` |

---

## Nota

Estos payloads son ejemplos reales capturados del webhook. La estructura raíz (`object` → `entry` → `changes` → `value`) es la misma; lo que varía es `messages[0]` según `type`.
