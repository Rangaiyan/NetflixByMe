import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './modules/Movies/movie.module';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'
import { MongooseConfig } from 'mongoose.config';

@Module({
  imports: [
   
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync(MongooseConfig),

    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    AuthModule,
    UserModule,
    MovieModule
  ],

})
export class AppModule {}
