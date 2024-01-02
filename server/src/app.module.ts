import { MiddlewareConsumer, Module, NestModule, } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { StudentModule } from './modules/student/student.module';
import { CoordinatorModule } from './modules/coordinator/coordinator.module';
import { SuperviserModule } from './modules/superviser/superviser.module';
import { ApplicationModule } from './modules/application/application.module';
import { CompanyModule } from './modules/company/company.module';
import { AuthModule } from './modules/auth/auth.module';
import { S3ManagerModule } from './modules/s3-manager/s3-manager.module';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './modules/department/department.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExpectionsFilter } from './common/exceptions/http.exception.filter';
import { ResumeModule } from './modules/resume/resume.module';
import { ImageModule } from './modules/image/image.module';
import { MulterModule } from '@nestjs/platform-express';
import { AwsSdkModule } from 'nest-aws-sdk';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from './common/utils/logger.middleware';

@Module({
  imports: [AuthModule, 
            PrismaModule,
            ConfigModule.forRoot({ isGlobal: true}),
            StudentModule,
            CoordinatorModule, 
            SuperviserModule, 
            ApplicationModule, 
            CompanyModule, 
            DepartmentModule,
            S3ManagerModule,
            ResumeModule,
            ImageModule,
            MulterModule.register(),
            // CacheModule.register({ isGlobal: true }),
            AwsSdkModule.forRoot({
              defaultServiceOptions: {
                accessKeyId: process.env.LIARA_ACCESS_KEY,
                secretAccessKey: process.env.LIARA_SECRET_KEY,
                endpoint: process.env.LIARA_ENDPOINT,
              },
            }),
            PassportModule.register({
              defaultStrategy: 'google',
              session: false,
            }),
          ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExpectionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
