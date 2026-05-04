import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';
import { CitasEntity } from './entity/citas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitasEntity])],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}
