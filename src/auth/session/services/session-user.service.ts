import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import type { SessionUserDto } from '../session.interface';

@Injectable()
export class SessionUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async loadUser(idUser: number): Promise<SessionUserDto> {
    const user = await this.userRepo.findOne({
      where: { id_user: idUser },
      select: ['id_user', 'username', 'id_bb'],
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      id_user: user.id_user,
      username: user.username,
      id_bb: user.id_bb,
    };
  }
}
