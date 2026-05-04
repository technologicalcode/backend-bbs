import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './clientes/cliente/cliente.module';
import { CitasModule } from './citas/citas.module';
import { BarbershopModule } from './barbershop/barbershop.module';
import { BarberoModule } from './barbero/barbero.module';
import { HorarioAtencionModule } from './horario_atencion/horario_atencion.module';
import { LoginModule } from './auth/login/login.module';
import { UserModule } from './auth/user/user.module';

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
      synchronize: true,
      retryAttempts: 5,
      retryDelay: 2000,
    }),
    ClienteModule,
    CitasModule,
    BarbershopModule,
    BarberoModule,
    HorarioAtencionModule,
    LoginModule,
    UserModule,
  ],
})
export class AppModule {}
