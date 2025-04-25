import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movies.schema';
import { CreateMovieDto } from './dto/movie.dto';
import { retry } from 'rxjs';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}
  @Get()
  async getAllMovie(): Promise<Movie[]> {
    return this.movieService.findAll();
  }
 
  @Post()
  async createMovie(
    @Body()
    movie: CreateMovieDto,
  ): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Movie> {
    return this.movieService.findById(id);
  }

}
