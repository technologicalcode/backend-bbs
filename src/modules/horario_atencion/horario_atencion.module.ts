import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CITA_GENERATOR } from 'src/core/tokens/injection.tokens';
import { CitasModule } from '../citas/citas.module';
import { HorarioAtencionController } from './horario_atencion.controller';
import { HorarioAtencionService } from './horario_atencion.service';
import { HorarioAtencionEntity } from './entity/horario_atencion.entity';
import { HorarioCitaGeneratorService } from './services/horario-cita-generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([HorarioAtencionEntity]), CitasModule],
  controllers: [HorarioAtencionController],
  providers: [
    HorarioAtencionService,
    HorarioCitaGeneratorService,
    { provide: CITA_GENERATOR, useExisting: HorarioCitaGeneratorService },
  ],
})
export class HorarioAtencionModule {}
