import {
  Logger,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Signin, Signup } from './dto/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/Userschemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('password does not match');
    }
    return user;
  }

  async login(longinDto:Signin) {
    // console.log(user);
    
    try{
      const user=await this.validateUser(longinDto.email,longinDto.password);
      if(!user){
        throw new HttpException('user not found',HttpStatus.NO_CONTENT);
      }
      const payload = {
        email: user.email,
        id: user._id,
        isAdmin: user.isAdmin,
      };
      console.log(payload);
      return {
        access_token: this.jwtService.sign(payload),
      }
    }catch(error){
      throw new HttpException("Bad Request",HttpStatus.BAD_REQUEST)
    }
   
  }

  async signup(signUpData: Signup) {
    const { name, email, password } = signUpData;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    this.logger.log(`User signed up successfully: ${email}`);
    return {
      message: 'user Signed up successfully',
    };
  }
}
