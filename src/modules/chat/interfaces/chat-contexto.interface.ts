import type { CanalChat } from '../constants/canal-chat';

/** Fase del flujo de reserva (máquina de estados liviana). */
export type FaseReservaChat =
  | 'inicio'
  | 'saludando'
  | 'identificando_intencion'
  | 'eligiendo_servicio'
  | 'eligiendo_profesional'
  | 'eligiendo_fecha'
  | 'eligiendo_hora'
  | 'confirmando'
  | 'confirmado'
  | 'cancelando'
  | 'consulta'
  | 'fuera_de_flujo';

/** Intención detectada por la IA (o reglas). */
export type IntencionChat =
  | 'reservar'
  | 'reagendar'
  | 'cancelar'
  | 'consultar_horario'
  | 'consultar_servicios'
  | 'consultar_precio'
  | 'saludo'
  | 'desconocido';

export interface MensajeChatContexto {
  rol: 'cliente' | 'bot' | 'sistema';
  texto: string;
  /** ISO 8601 */
  en: string;
}

interface IdentificadoresChat{
  telefono: string;
  username: string;
  nombre: string;
}
/**
 * Contexto de conversación en Redis (cache de sesión para la IA).
 * Postgres (`conversacion_chat`) guarda la conversación duradera;
 * esto vive solo mientras el chat está activo.
 */
export interface ChatContextoRedis {
  // ——— Identidad de la conversación ———
  /** Canal: whatsapp, instagram, etc. */
  canal: CanalChat;
  /** Teléfono / username / id del cliente en esa red. */
  identificador_cliente: IdentificadoresChat[];
  /** Número o id del negocio en esa plataforma (línea que recibe el mensaje). */
  identificador_negocio: IdentificadoresChat[];
  id_negocio: number;
  id_conversacion?: number;
  id_cliente?: number | null;

  // ——— Estado del diálogo ———
  fase: FaseReservaChat;
  intencion: IntencionChat | null;
  /** Resumen corto de lo que ya se entendió (para la IA). */
  resumen?: string | null;

  // ——— Datos de reserva en construcción ———
  reserva: {
    id_servicio?: number | null;
    nombre_servicio?: string | null;
    id_usuario?: number | null; // profesional
    nombre_profesional?: string | null;
    /** YYYY-MM-DD si el cliente ya eligió día */
    fecha?: string | null;
    /** HH:mm si ya eligió hora */
    hora?: string | null;
    id_cita?: number | null;
    /** true solo cuando el cliente confirmó explícitamente */
    confirmada: boolean;
  };

  // ——— Ventana de mensajes recientes (historial corto) ———
  mensajes: MensajeChatContexto[];

  // ——— Metadata ———
  /** ISO 8601 */
  iniciado_en: string;
  /** ISO 8601 */
  actualizado_en: string;
}

export const CHAT_CONTEXTO_TTL_SEGUNDOS = 60 * 60 * 6; // 6 horas

export function crearChatContextoVacio(params: {
  canal: CanalChat;
  identificador_cliente: IdentificadoresChat[];
  identificador_negocio: IdentificadoresChat[];
  id_negocio: number;
  id_conversacion?: number;
  id_cliente?: number | null;
}): ChatContextoRedis {
  const ahora = new Date().toISOString();
  return {
    canal: params.canal,
    identificador_cliente: params.identificador_cliente,
    identificador_negocio: params.identificador_negocio,
    id_negocio: params.id_negocio,
    id_conversacion: params.id_conversacion,
    id_cliente: params.id_cliente ?? null,
    fase: 'inicio',
    intencion: null,
    resumen: null,
    reserva: {
      confirmada: false,
    },
    mensajes: [],
    iniciado_en: ahora,
    actualizado_en: ahora,
  };
}
