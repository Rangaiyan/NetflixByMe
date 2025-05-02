import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RefreshTokenDto, Signin, Signup} from "./dto/auth.dto"

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signup')
    signup(@Body() dto:Signup){
        return this.authService.signup(dto)
    }
    @Post('signin')
    signin(@Body() dto:Signin){
        return this.authService.login(dto);
    }
    @Post('refresh')
    async refreshTokens(@Body() refreshTokenDto:RefreshTokenDto){
        return this.authService.refreshTokens(refreshTokenDto.refreshToken);
    }
   

}