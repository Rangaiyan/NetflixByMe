import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable({})
export class AuthService {
  login(dto:AuthDto) {
    // return 'user signed in'
    return{
        message:'user signed in',
        data:dto
    }
  }
  signup(dto:AuthDto) {
    return{
        message:'user signed upp!',
        data:dto
    }
  }
}
