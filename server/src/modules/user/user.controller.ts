import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}
  // @Post()
  // createUser() {
  //     return 'User created';
  // }

  // @Post(':id')
  // updateUser(@Param('id') id: string) {
  //     return `User with ID ${id} updated`;
  // }
//   @Post(':id')
//   getUsers(@Req() req: Request) {
//     console.log(req);
//     return req.params.id;
//   }
  @Get()
  getAllUsers() {
    return this.userService.getUser();
  }
  @Patch(':id')
  update(@Body() bdy:any, @Param() id:{id: number}) {
    return this.userService.update(bdy, id);
  }

  @Post()
  getU(@Body() userDto:UserDto){
    return this.userService.getU(userDto);
  }
  
}
