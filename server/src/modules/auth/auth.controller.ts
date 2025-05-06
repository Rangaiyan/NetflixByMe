import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Signin, Signup} from "./dto/auth.dto"
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    
    @Post('signup')
    signup(@Body() dto:Signup){
        return this.authService.signup(dto)
    }
    
    @UseGuards(AuthGuard('local'))
    @Post('signin')
    signin(@Request() req) {
      return this.authService.login(req.user); 
    }
    

   

}