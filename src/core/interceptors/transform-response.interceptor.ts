import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import type { Request } from 'express';
import { SKIP_API_RESPONSE_KEY } from '../constants';
import { normalizeApiResponse } from '../interface/api-response';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (this.shouldSkip(context)) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => normalizeApiResponse(data)),
    );
  }

  private shouldSkip(context: ExecutionContext): boolean {
    const skipByDecorator = this.reflector.getAllAndOverride<boolean>(
      SKIP_API_RESPONSE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (skipByDecorator) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const path = request.originalUrl ?? request.url ?? '';
    return path.startsWith('/api/auth');
  }
}
