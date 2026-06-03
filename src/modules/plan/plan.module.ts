import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './entity/plan.entity';
import { NegocioPlanEntity } from './entity/negocio_plan.entity';
import { PlanPermisoEntity } from './entity/plan_permiso.entity';
import { PagosEntity } from './entity/pagos.entity';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';
import { NegocioPlanService } from './negocio_plan/negocio_plan.service';
import { PlanPermisoService } from './plan_permiso/plan_permiso.service';
import { PagosService } from './pagos/pagos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlanEntity,
      NegocioPlanEntity,
      PlanPermisoEntity,
      PagosEntity,
    ]),
  ],
  controllers: [PlanController],
  providers: [PlanService, NegocioPlanService, PlanPermisoService, PagosService],
  exports: [TypeOrmModule, PlanService, NegocioPlanService, PlanPermisoService, PagosService],
})
export class PlanModule {}
