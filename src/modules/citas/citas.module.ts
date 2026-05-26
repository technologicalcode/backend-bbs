import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CITAS_WRITER } from 'src/core/tokens/injection.tokens';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { CitasEntity } from './entity/citas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitasEntity])],
  controllers: [CitasController],
  providers: [
    CitasService,
    { provide: CITAS_WRITER, useExisting: CitasService },
  ],
  exports: [CitasService, CITAS_WRITER],
})
export class CitasModule {}
