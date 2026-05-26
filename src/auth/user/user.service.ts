import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { ApiResponse } from 'src/core/interface/api-response';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserDto): Promise<ApiResponse> {
    const hashedPassword = await hash(user.password, 10);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    const result = await this.userRepository.save(newUser);

    if (result) {
      return {
        status: true,
        message: 'User created successfully',
        data: {
          id_user: result.id_user,
          username: result.username,
          id_bb: result.id_bb,
        },
      };
    }

    return {
      status: false,
      message: 'Failed to create user',
      data: null,
    };
  }


}
