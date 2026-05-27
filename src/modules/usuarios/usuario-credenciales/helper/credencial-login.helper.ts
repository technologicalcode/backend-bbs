import { Repository } from 'typeorm';
import { BarberoEntity } from 'src/modules/barbero/entity/barbero.entity';
import { UsuariosEntity } from '../../entity/usuarios.entity';
import { UsuarioCredencialesEntity } from '../../entity/usuario-credenciales.entity';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';

export async function toLoginPayload(
  credencial: UsuarioCredencialesEntity,
  barberoRepo: Repository<BarberoEntity>,
  usuariosRepo?: Repository<UsuariosEntity>,
): Promise<LoginPayload> {
  let id_bb = credencial.id_usuario;

  if (usuariosRepo) {
    const usuario = await usuariosRepo.findOne({
      where: { id_usuario: credencial.id_usuario },
    });
    if (usuario) {
      const barbero = await barberoRepo.findOne({
        where: {
          nombre: usuario.nombre,
          apellido: usuario.apellido,
        },
      });
      if (barbero) {
        id_bb = barbero.id_bb;
      }
    }
  } else {
    const barbero = await barberoRepo.findOne({
      where: { id_bb: credencial.id_usuario },
    });
    if (barbero) {
      id_bb = barbero.id_bb;
    }
  }

  return {
    id_user: credencial.id_usuario_credencial,
    username: credencial.username,
    id_bb,
  };
}
