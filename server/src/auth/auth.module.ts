import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // ✅ Import your controller
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { userSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'signup', schema: userSchema }]),
  ],
  controllers: [AuthController], // ✅ List the actual controller
  providers: [AuthService],
})
export class AuthModule {}
