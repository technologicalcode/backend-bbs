import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { BarberoEntity } from 'src/modules/barbero/entity/barbero.entity';
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
    @InjectRepository(BarberoEntity)
    private readonly barberoRepo: Repository<BarberoEntity>,
    @InjectRepository(UsuariosEntity)
    private readonly usuariosRepo: Repository<UsuariosEntity>,
  ) {}

  async validate(credentials: LoginDto): Promise<LoginPayload> {
    const credencial = await this.credencialesRepo.findOne({
      where: { username: credentials.username },
    });

    if (!credencial) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await compare(
      credentials.password,
      credencial.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return toLoginPayload(credencial, this.barberoRepo, this.usuariosRepo);
  }
}
