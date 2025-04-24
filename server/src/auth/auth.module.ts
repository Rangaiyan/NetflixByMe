import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';  // ✅ Import your controller

@Module({
  controllers: [AuthController],  // ✅ List the actual controller
  providers: [AuthService],
})
export class AuthModule {}
