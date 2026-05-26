import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import type { LoginDto } from '../dto/login.dto';
import type { LoginPayload } from '../interface/login.interface';

@Injectable()
export class AuthCredentialsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async validate(credentials: LoginDto): Promise<LoginPayload> {
    const user = await this.userRepository.findOne({
      where: { username: credentials.username },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await compare(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      id_user: user.id_user,
      username: user.username,
      id_bb: user.id_bb,
    };
  }
}
