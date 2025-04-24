import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

const uri =
  'mongodb+srv://Rangaiyan29:1234@cluster0.4ptozq4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
