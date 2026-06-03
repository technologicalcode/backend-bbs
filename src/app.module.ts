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
import { WhatsAppModule } from './modules/WhatsApp/WhatsApp.module';
import { PlanModule } from './modules/plan/plan.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    AuthModule,
    RbacModule,
    ClienteModule,
    CitasModule,
    HorarioAtencionModule,
    NegocioModule,
    WhatsAppModule,
    LoginModule,
    SessionModule,
    UsuariosModule,
    PlanModule,
  ],
})
export class AppModule {}
