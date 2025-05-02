import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/modules/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshToken, RefreshTokenSchema } from 'src/modules/user/schemas/refresh-token.schema';
import configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:async (config: ConfigService) => ({
        uri: config.get<string>('database.connectionString'),
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '1h' },
      }),
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
