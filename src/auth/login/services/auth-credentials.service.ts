import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { UsuarioCredencialesEntity } from 'src/modules/usuarios/entity/usuario-credenciales.entity';
import { UsuariosEntity } from 'src/modules/usuarios/entity/usuarios.entity';
import { toLoginPayload } from 'src/modules/usuarios/usuario-credenciales/helper/credencial-login.helper';
import type { LoginDto } from '../dto/login.dto';
import type { LoginPayload } from '../interface/login.interface';

@Injectable()
export class AuthCredentialsService {
  constructor(
    @InjectRepository(UsuarioCredencialesEntity)
    private readonly credencialesRepo: Repository<UsuarioCredencialesEntity>,
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepo: Repository<UsuariosEntity>,
  ) {}

  async validate(credentials: LoginDto): Promise<LoginPayload> {
    const credencial_username = await this.credencialesRepo.findOne({
      where: { username: credentials.username },
    });

    if (!credencial_username) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await compare(
      credentials.password,
      credencial_username.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return toLoginPayload(credencial_username, this.usuariosRepo);
  }
}
