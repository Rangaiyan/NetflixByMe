import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getUserDetails(@Request() req) {
    const user = await this.userService.getUserById(req.user.id);
    console.log(req.user.id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  @Post('favorites')
  async addToFavorites(@Request() req, @Body() body: { movieId: string }) {
    return this.userService.addFavoriteMovie(req.user.id, body.movieId);
  }

  @Post('watched')
  async addToWatched(@Request() req, @Body() body: { movieId: string }) {
    return this.userService.addWatchedMovie(req.user.id, body.movieId);
  }
}
