import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseConfig } from './database/mongoose.config';
import { MovieModule } from './Movies/movie.module';
@Module({
  imports: [AuthModule, UserModule, MongooseConfig,MovieModule],
})
export class AppModule {}
