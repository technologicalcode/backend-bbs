import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorarioAtencionController } from './horario_atencion.controller';
import { HorarioAtencionService } from './horario_atencion.service';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';
import { CitasModule } from '../citas/citas.module';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioAtencionEntity]), CitasModule],
  controllers: [HorarioAtencionController],
  providers: [HorarioAtencionService],
})
export class HorarioAtencionModule {}
