import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';

@Injectable({})
export class AuthService {

  constructor(
    @InjectModel('signup') private readonly userModel: Model<any>,
  ) {}


  login(dto:AuthDto) {
    // return 'user signed in'
    return{
        message:'user signed in',
        data:dto
    }
  }
  // signup(dto:AuthDto) {
  //   return{
  //       message:'user signed upp!',
  //       data:dto
  //   }
  // }
  async signup(dto: AuthDto) {
    const { name, email, password } = dto;

    // Optionally check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    const newUser = new this.userModel({
      name,
      email,
      password, // ⚠️ In production, hash this before saving
    });

    const savedUser = await newUser.save();

    return {
      message: 'User signed up successfully!',
      data: savedUser,
    };
  }
}
