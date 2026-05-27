import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { BarberoEntity } from 'src/modules/barbero/entity/barbero.entity';
import { UsuarioCredencialesEntity } from 'src/modules/usuarios/entity/usuario-credenciales.entity';
import { UsuariosEntity } from 'src/modules/usuarios/entity/usuarios.entity';
import { AuthCredentialsService } from './services/auth-credentials.service';
import { TokenIssuerService } from './services/token-issuer.service';
import { RefreshCookieService } from './services/refresh-cookie.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioCredencialesEntity,
      UsuariosEntity,
      BarberoEntity,
    ]),
    AuthModule,
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    AuthCredentialsService,
    TokenIssuerService,
    RefreshCookieService,
  ],
})
export class LoginModule {}
