import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasModule } from '../citas/citas.module';
import { HorarioAtencionController } from './horario_atencion.controller';
import { HorarioAtencionService } from './horario_atencion.service';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';
import { BloqueosHorarioEntity } from './entity/bloqueos_horario.entity';
import { BloqueosHorarioController } from './bloqueos_horario/bloqueos_horario.controller';
import { BloqueosHorarioService } from './bloqueos_horario/bloqueos_horario.service';
import { HorarioAtencionEttra } from './helper/horario_atentencio_ettra';

@Module({
  imports: [
    TypeOrmModule.forFeature([HorarioAtencionEntity, BloqueosHorarioEntity]),
    CitasModule,
  ],
  controllers: [HorarioAtencionController, BloqueosHorarioController],
  providers: [
    HorarioAtencionService,
    BloqueosHorarioService,
    HorarioAtencionEttra
  ],
  exports: [TypeOrmModule, BloqueosHorarioService],
})
export class HorarioAtencionModule {}
