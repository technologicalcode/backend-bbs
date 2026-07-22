import type { CanalChat } from '../../modules/chat/constants/canal-chat';

/**
 * Convención de keys Redis del proyecto.
 * chat:ctx:{canal}:{identificador_cliente}:{id_negocio}
 */
export const RedisKeys = {
  chatContexto: (
    canal: CanalChat | string,
    identificadorCliente: string,
    idNegocio: number,
  ): string => `chat:ctx:${canal}:${identificadorCliente}:${idNegocio}`,
} as const;
