import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './modules/Movies/movie.module';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'

@Module({
  imports: [
   
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.get<string>('database.connectionString'),
      }),
      inject: [ConfigService],
    }),

    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    AuthModule,
    UserModule,
    MovieModule
  ],

})
export class AppModule {}
