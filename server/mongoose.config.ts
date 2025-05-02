import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const MongooseConfig = MongooseModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('database.connectionString'),
  }),
  inject: [ConfigService],
});