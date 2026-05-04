import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioAtencionController } from './horario_atencion.controller';
import { HorarioAtencionService } from './horario_atencion.service';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioAtencionEntity])],
  controllers: [HorarioAtencionController],
  providers: [HorarioAtencionService],
})
export class HorarioAtencionModule {}
