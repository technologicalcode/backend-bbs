import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { CitasEntity } from './entity/citas.entity';
import { CitaHelper } from './helper/citas.helper';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [TypeOrmModule.forFeature([CitasEntity]), UsuariosModule],
  controllers: [CitasController],
  providers: [
    CitasService,
    CitaHelper,
  ],
  exports: [CitasService],
})
export class CitasModule {}
