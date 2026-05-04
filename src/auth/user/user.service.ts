import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { ApiResponse } from 'src/core/interface/api-response';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

   async createUser(user:UserDto):Promise<ApiResponse> {
        const newUser = this.userRepository.create(user);
         const result = await this.userRepository.save(newUser)
         if(result){
            return {
                status: 'success',
                message: 'User created successfully',
                data: result
            }
         }else{
            return {
                status: 'error',
                message: 'Failed to create user',
                data: null
            }
         }
    }

    
}
