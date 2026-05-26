import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserEntity } from 'src/auth/user/entity/user.entity';
import { AuthCredentialsService } from './services/auth-credentials.service';
import { TokenIssuerService } from './services/token-issuer.service';
import { RefreshCookieService } from './services/refresh-cookie.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [LoginController],
  providers: [
    LoginService,
    AuthCredentialsService,
    TokenIssuerService,
    RefreshCookieService,
  ],
})
export class LoginModule {}
