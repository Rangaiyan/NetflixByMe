import { Injectable, UnauthorizedException } from '@nestjs/common';
import {  Signin, Signup } from './dto/auth.dto';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import * as bcrypt from "bcrypt"

@Injectable({})
export class AuthService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async login(credential: Signin) {
    const { email, password } = credential;
    const user = await this.userModel.findOne({ email });
    
    if (!user) {
      console.log("User not found with email:", email);  // Add this log
      throw new UnauthorizedException("Invalid credentials");
    }
  
    // console.log("User found:", user);  // Add this log to verify the user is fetched
  
    const passwordMatch = await bcrypt.compare(password, user.password.toString());
    
    if (!passwordMatch) {
      console.log("Password does not match for user:", email);  // Add this log
      throw new UnauthorizedException("Invalid credentials");
    }
  
    return {
      message: 'User signed in successfully',
      data: credential
    };
  }
  

  async signup(signUpData: Signup) {
    const { name, email, password } = signUpData;
  
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }
  
    const hashedPassword = await bcrypt.hash(password, 10); 
  
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword, 
    });
  console.log(hashedPassword);
    const savedUser = await newUser.save();
  
    return {
      message: 'User signed up successfully!',
      data: savedUser,
    };
  }
  
}



