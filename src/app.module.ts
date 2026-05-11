import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? '127.0.0.1',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'bbs',
      autoLoadEntities: true,
      /** Crea/ajusta tablas desde las entidades. En producción usar migraciones y poner TYPEORM_SYNC=false */
      synchronize: process.env.TYPEORM_SYNC !== 'false',
      retryAttempts: 5,
      retryDelay: 2000,
    }),
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
