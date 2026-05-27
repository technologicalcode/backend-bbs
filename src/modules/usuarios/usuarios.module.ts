import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from './usuarios.controller';
import { TipoUsuariosController } from './tipo-usuarios/tipo-usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TipoUsuariosService } from './tipo-usuarios/tipo-usuarios.service';
import { UsuariosEntity } from './entity/usuarios.entity';
import { TipoUsuariosEntity } from './entity/tipo-usuarios.entity';
import { UsuarioCredencialesModule } from './usuario-credenciales/usuario-credenciales.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuariosEntity, TipoUsuariosEntity]),
    UsuarioCredencialesModule,
  ],
  controllers: [UsuariosController, TipoUsuariosController],
  providers: [UsuariosService, TipoUsuariosService],
  exports: [UsuarioCredencialesModule, TypeOrmModule],
})
export class UsuariosModule {}
