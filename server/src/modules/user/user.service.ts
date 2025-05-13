import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/Userschemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(userId: string) {
    return this.userModel
      .findById(userId)
      .populate('favoriteMovies')
      .populate('watchedMovies')
      .exec();
  }
  async addFavoriteMovie(userId: string, movieId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const alreadyExists = user.favoriteMovies.some(
      (movie) => movie.toString() === movieId,
    );

    if (!alreadyExists) {
      user.favoriteMovies.push(movieId as any);
      await user.save();
    }

    return {
      message: 'Movie added to favorites',
      favoriteMovies: user.favoriteMovies,
    };
  }

  async addWatchedMovie(userId: string, movieId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const alreadyExists = user.watchedMovies.some(
      (movie) => movie.toString() === movieId,
    );

    if (!alreadyExists) {
      user.watchedMovies.push(movieId as any);
      await user.save();
    }

    return {
      message: 'Movie marked as watched',
      watchedMovies: user.watchedMovies,
    };
  }

  async getFavoriteMovies(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('favoriteMovies')
      .exec();

    if (!user) throw new NotFoundException('User not found');

    return {
      favoriteMovies: user.favoriteMovies,
    };
  }

  async getWatchedMovies(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('watchedMovies')
      .exec();

    if (!user) throw new NotFoundException('User not found');

    return {
      watchedMovies: user.watchedMovies,
    };
  }
}
