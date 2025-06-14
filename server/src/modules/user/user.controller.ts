import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  Query,
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
    //console.log(req.user.id);
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

  @Get('favorites')
  async getFavoriteMovies(@Request() req) {
    return this.userService.getFavoriteMovies(req.user.id);
  }

  @Get('watched')
  async getWatchedMovies(@Request() req) {
    return this.userService.getWatchedMovies(req.user.id);
  }

  @Get('genre/:genre')
  async getMoviesByGenre(
    @Param('genre') genre: string,
    @Query('excludeId') excludeId?: string,
  ) {
    return this.userService.getMoviesByGenre(genre, excludeId);
  }
}
