import { GenericResponseDto } from '@drivia/utils';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<
  T,
  { data?: T; status?: number; message?: string }
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ data?: T; status?: number; message?: string }> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe<GenericResponseDto<T>>(
      map((data) => {
        return {
          data,
          status: response.statusCode || 200,
          message: 'Success',
        };
      }),
    );
  }
}
