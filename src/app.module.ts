import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/database.config';
import { ClienteModule } from './modules/clientes/cliente/cliente.module';
import { CitasModule } from './modules/citas/citas.module';
import { HorarioAtencionModule } from './modules/horario_atencion/horario_atencion.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './auth/login/login.module';
import { SessionModule } from './auth/session/session.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { NegocioModule } from './modules/negocio/negocio.module';
import { ChatModule } from './modules/chat/chat.module';
import { PlanModule } from './modules/plan/plan.module';
import { servicioModulo } from './modules/servicio_negocio/servicio_negocio.module';
import { RedisModule } from './core/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    AuthModule,
    RbacModule,
    ClienteModule,
    CitasModule,
    HorarioAtencionModule,
    NegocioModule,
    ChatModule,
    LoginModule,
    SessionModule,
    UsuariosModule,
    PlanModule,
    servicioModulo,
    RedisModule,
  ],
})
export class AppModule {}
