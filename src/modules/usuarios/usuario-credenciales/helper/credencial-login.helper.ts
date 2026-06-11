import { Repository } from 'typeorm';
import { UsuariosEntity } from '../../entity/usuarios.entity';
import { UsuarioCredencialesEntity } from '../../entity/usuario-credenciales.entity';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';

export async function toLoginPayload(
  credencial: UsuarioCredencialesEntity,
  usuariosRepo: Repository<UsuariosEntity>,
): Promise<LoginPayload> {
  
  const usuario = await usuariosRepo.findOne({
    where: { id_usuario: credencial.id_usuario },
  });

  return {
    username: credencial.username,
    id_usuario: usuario?.id_usuario ?? credencial.id_usuario,
  };
}
