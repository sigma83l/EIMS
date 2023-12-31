import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { ExecutionContext, HttpArgumentsHost } from '@nestjs/common/interfaces';
  import { HttpAdapterHost } from '@nestjs/core';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
  
  @Catch()
  export class AllExpectionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    private logger = new Logger('HTTP');
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const { httpAdapter } = this.httpAdapterHost;
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody =
        this.inferSystemError(exception, ctx) ??
        this.inferDateBaseErorr(exception, ctx) ??
        this.inferUnHandeledErorr(exception, ctx);
      httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
      console.log(exception);
    }
    inferSystemError(exception, ctx: HttpArgumentsHost) {
      const { httpAdapter } = this.httpAdapterHost;
  
      if (exception instanceof HttpException) {
        if (exception.getStatus() >= 500) {
          this.logger.log(`server side expection occured${exception}`);
        }
        const message =
          exception.getStatus() >= 500
            ? "Something went wrong. Please try again later"
            : exception.getResponse();
  
        return {
          statusCode: exception.getStatus(),
          timeStamp: new Date().toISOString(),
          message: message,
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };
      }
  
      return undefined;
    }
  
    inferDateBaseErorr(exception, ctx: HttpArgumentsHost) {
      const { httpAdapter } = this.httpAdapterHost;
  
      if (exception instanceof PrismaClientKnownRequestError) {
        
        this.logger.log(`a prisma expection occures ${exception}`);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timeStamp: new Date().toISOString(),
          message: "Something went wrong. Please try again later",
          path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };
      }
      return undefined;
    }
  
    inferUnHandeledErorr(exception, ctx: HttpArgumentsHost) {
      const { httpAdapter } = this.httpAdapterHost;
      
      this.logger.log(`a new wierd expection occures ${exception}`);
  
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timeStamp: new Date().toISOString(),
        message: "Something went wrong. Please try again later",
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };
    }
  }