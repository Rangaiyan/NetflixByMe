import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/Userschemas/user.schema';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from 'src/schemas/Movieschema/movies.schema';
import { Profile, ProfileDocument } from 'src/schemas/Userschemas/profile.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getOrCreateProfile(userId: string) {
    let profile = await this.profileModel
      .findOne({ userId })
      .populate('favoriteMovies')
      .populate('watchedMovies')
      .exec();

    if (!profile) {
      profile = new this.profileModel({ userId, favoriteMovies: [], watchedMovies: [] });
      await profile.save();
    }

    return profile;
  }

  async addFavoriteMovie(userId: string, movieId: string) {
    const profile = await this.getOrCreateProfile(userId);

    const alreadyExists = profile.favoriteMovies.some(
      (movie) => movie.toString() === movieId,
    );

    if (!alreadyExists) {
      profile.favoriteMovies.push(movieId as any);
      await profile.save();
    }

    return {
      message: 'Movie added to favorites',
      favoriteMovies: profile.favoriteMovies,
    };
  }

  async addWatchedMovie(userId: string, movieId: string) {
    const profile = await this.getOrCreateProfile(userId);

    const alreadyExists = profile.watchedMovies.some(
      (movie) => movie.toString() === movieId,
    );

    if (!alreadyExists) {
      profile.watchedMovies.push(movieId as any);
      await profile.save();

      const movie = await this.movieModel.findById(movieId);
      if (!movie) throw new NotFoundException('Movie not found');

      movie.viewsCount += 1;
      await movie.save();
    }

    return {
      message: 'Movie marked as watched',
      watchedMovies: profile.watchedMovies,
    };
  }

  async getFavoriteMovies(userId: string) {
    const profile = await this.profileModel
      .findOne({ userId })
      .populate('favoriteMovies')
      .exec();

    if (!profile) throw new NotFoundException('Profile not found');

    return {
      favoriteMovies: profile.favoriteMovies,
    };
  }

  async getWatchedMovies(userId: string) {
    const profile = await this.profileModel
      .findOne({ userId })
      .populate('watchedMovies')
      .exec();

    if (!profile) throw new NotFoundException('Profile not found');

    return {
      watchedMovies: profile.watchedMovies,
    };
  }

async getMoviesByGenre(genre: string, excludeMovieId?: string) {
  const query = excludeMovieId
    ? { genre: { $regex: `\\b${genre}\\b`, $options: 'i' }, _id: { $ne: excludeMovieId } }
    : { genre: { $regex: `\\b${genre}\\b`, $options: 'i' } };

  return await this.movieModel.find(query).exec();
}


}