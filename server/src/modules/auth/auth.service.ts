import { Logger, Injectable, UnauthorizedException } from '@nestjs/common';
import { Signin, Signup } from './dto/auth.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/modules/user/schemas/refresh-token.schema';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async login(credentials: Signin) {
    const { email, password } = credentials;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.warn(`Login failed: invalid user with email ${email}`);
      throw new UnauthorizedException();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      this.logger.warn(`Login failed: incorrect password for email ${email}`);
      throw new UnauthorizedException();
    }

    const tokens = await this.generateUserTokens(
      user._id.toString(),
      user.email,
      user.isAdmin,
    );

    const refreshToken = uuidv4();
    await this.storeRefreshToken(user.email, refreshToken);

    this.logger.log(`User logged in successfully: ${email}`);
    return {
      ...tokens,
      refreshToken,
      userId: user._id,
      isAdmin: user.isAdmin,
      message: 'User signed in successfully',
    };
  }

  async signup(signUpData: Signup) {
    const { name, email, password } = signUpData;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException();
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
      message: 'User signed up successfully!',
      data: {
        email: newUser.email,
        name: newUser.name,
        id: newUser._id,
      },
    };
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    const user = await this.userModel.findOne({ email: token.email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.refreshTokenModel.deleteOne({ token: refreshToken });

    const newRefreshToken = uuidv4();
    await this.storeRefreshToken(user.email, newRefreshToken);

    const tokens = await this.generateUserTokens(
      user._id.toString(),
      user.email,
      user.isAdmin,
    );

    return {
      ...tokens,
      refreshToken: newRefreshToken,
    };
  }

  async generateUserTokens(userId: string, email: string, isAdmin: boolean) {
    const payload = { sub: userId, email, isAdmin };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    return { accessToken };
  }

  async storeRefreshToken(email: string, refreshToken: string) {
    const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.refreshTokenModel.updateOne(
      { email },
      {
        email,
        token: refreshToken,
        expiryDate,
      },
      { upsert: true },
    );
  }
}
