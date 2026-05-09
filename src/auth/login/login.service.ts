import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { LoginPayload } from './interface/login.interface';
import { ApiResponse } from 'src/core/interface/api-response';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LoginDto): Promise<ApiResponse> {
    console.log(credentials);
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

    const payload: LoginPayload = {
      id_user: user.id_user,
      username: user.username,
      id_bb: user.id_bb,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      status: true,
      message: 'Login correcto',
      data: {
        access_token: accessToken,
        user: payload,
      },
    };
  }
}
