import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';

const SOMETHING_WENT_WRONG = 'Something went wrong. Please try again later';
type CatchI = Response<unknown, Record<string, unknown>>;
@Catch()
export class HttpExceptionInterceptor implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost): CatchI {
    console.log('RAW EXCEPTION:', JSON.stringify(exception, null, 2));

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const { method, url } = request;
    const userAgent = request.get('user-agent') || '';
    const ip = request.ip;
    const userId = request.user?._id
      ? `auth-user-id: ${request.user._id}`
      : 'Guest';
    const requestMetaData = `${method}::${url} ${userId} ${userAgent} {ip: ${ip}}`;
    let error: { status: number; message: string } = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: SOMETHING_WENT_WRONG,
    };

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();
      let errorMessage: string;

      if (exception instanceof ForbiddenException) {
        errorMessage =
          'Forbidden resource: You are not allowed to take this action or access this resource.';
      } else if (exception instanceof UnauthorizedException) {
        errorMessage =
          'Unauthorized access: You need to be logged in to take this action.';
      } else if (exception instanceof ThrottlerException) {
        const res = exception.getResponse() as string;
        errorMessage = res.split(': ')[1];
      } else if (typeof errorResponse === 'string') {
        errorMessage = errorResponse;
      } else {
        errorMessage = (errorResponse as { message: string }).message;
      }

      this.logger.error(errorMessage, requestMetaData);
      error = { status, message: errorMessage };
    }

    const rpcError = exception as {
      message?: string;
      error?: { message?: string; statusCode?: number };
      status?: number;
      statusCode?: number;
    };

    const rpcMessage = rpcError?.error?.message ?? rpcError?.message;
    const rpcStatus = Number(
      rpcError?.error?.statusCode ?? rpcError?.statusCode,
    );
    if (
      rpcMessage &&
      Number.isInteger(rpcStatus) &&
      rpcStatus >= 100 &&
      rpcStatus < 600
    ) {
      error = { status: rpcStatus, message: rpcMessage };
    }
    this.logger.error(error.message, requestMetaData);
    if (process.env.NODE_ENV === 'development') {
      this.logger.error(exception);
    }

    return response.status(error.status).json(error);
  }
}
