import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CITA_GENERATOR } from 'src/core/tokens/injection.tokens';
import { CitasModule } from '../citas/citas.module';
import { HorarioAtencionController } from './horario_atencion.controller';
import { HorarioAtencionService } from './horario_atencion.service';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';
import { BloqueosHorarioEntity } from './entity/bloqueos_horario.entity';
import { HorarioCitaGeneratorService } from './services/horario-cita-generator.service';
import { BloqueosHorarioController } from './bloqueos_horario/bloqueos_horario.controller';
import { BloqueosHorarioService } from './bloqueos_horario/bloqueos_horario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HorarioAtencionEntity, BloqueosHorarioEntity]),
    CitasModule,
  ],
  controllers: [HorarioAtencionController, BloqueosHorarioController],
  providers: [
    HorarioAtencionService,
    BloqueosHorarioService,
    HorarioCitaGeneratorService,
    { provide: CITA_GENERATOR, useExisting: HorarioCitaGeneratorService },
  ],
  exports: [TypeOrmModule, BloqueosHorarioService],
})
export class HorarioAtencionModule {}
