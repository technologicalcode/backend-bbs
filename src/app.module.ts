import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/database.config';
import { ClienteModule } from './modules/clientes/cliente/cliente.module';
import { CitasModule } from './modules/citas/citas.module';
import { BarbershopModule } from './modules/barbershop/barbershop.module';
import { BarberoModule } from './modules/barbero/barbero.module';
import { HorarioAtencionModule } from './modules/horario_atencion/horario_atencion.module';
import { AuthModule } from './auth/auth.module';
import { LoginModule } from './auth/login/login.module';
import { SessionModule } from './auth/session/session.module';
import { UserModule } from './auth/user/user.module';
import { RbacModule } from './modules/rbac/rbac.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    AuthModule,
    RbacModule,
    ClienteModule,
    CitasModule,
    BarbershopModule,
    BarberoModule,
    HorarioAtencionModule,
    LoginModule,
    SessionModule,
    UserModule,
  ],
})
export class AppModule {}
