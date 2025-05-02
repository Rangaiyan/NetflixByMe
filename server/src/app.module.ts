import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './modules/Movies/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        uri: configService.get<string>('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MovieModule
  ],

})
export class AppModule {}
