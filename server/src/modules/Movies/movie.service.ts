import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movies.schema';
import { CreateMovieDto } from './dto/crateMovie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new this.movieModel(createMovieDto);
    return movie.save();
  }

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find();
  }

  async findByGenre(genre: string): Promise<Movie[]> {
    return this.movieModel.find({ genre });
  }

  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id);
    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const update = await this.movieModel.findByIdAndUpdate(id, updateMovieDto, {
      new: true,
    });
    if (!update) throw new NotFoundException('Movie not found');
    return update;
  }

  async deleteById(id: string): Promise<Movie> {
    const deleted = await this.movieModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Movie not found');
    return deleted;
  }

  async search(query: string): Promise<Movie[]> {
    const regex = new RegExp(query, 'i');
    return this.movieModel.find({
      $or: [
        { title: regex },
        { description: regex },
        { director: regex },
        { genre: regex },
        { language: regex },
      ],
    });
  }
}
