import { Injectable, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  getUser() {
    return { emai: 'ranga@gmail.com', password: '1234ra' };
  }


  update(body:any ,param:{id:number}){
    return {body,param}
  }
  getU(userDto:UserDto){
    return userDto;
  }
}

