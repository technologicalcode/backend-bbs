import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { LoginPayload } from 'src/auth/login/interface/login.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): LoginPayload => {
    const request = ctx.switchToHttp().getRequest<{ user: LoginPayload }>();
    return request.user;
  },
);
