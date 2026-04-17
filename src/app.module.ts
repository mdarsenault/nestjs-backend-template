import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import appConfig from '@/config/app.config';
import databaseConfig from '@/config/database.config';
import environmentValidation from '@/config/environment.validation';

import { LoggerModule } from './common/logger/logger.module';
import { HealthModule } from './health/health.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const config = configService.get<TypeOrmModuleOptions>(
          'database.databaseConfig',
        );
        if (!config) {
          throw new Error('Database configuration not found');
        }
        return config;
      },
    }),
    LoggerModule.forRoot(),
    HealthModule,
  ],
})
export class AppModule {}
