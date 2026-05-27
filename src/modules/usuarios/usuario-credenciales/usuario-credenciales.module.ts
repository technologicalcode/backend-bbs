import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioCredencialesController } from './usuario-credenciales.controller';
import { UsuarioCredencialesService } from './usuario-credenciales.service';
import { UsuarioCredencialesEntity } from '../entity/usuario-credenciales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioCredencialesEntity])],
  controllers: [UsuarioCredencialesController],
  providers: [UsuarioCredencialesService],
  exports: [UsuarioCredencialesService, TypeOrmModule],
})
export class UsuarioCredencialesModule {}
