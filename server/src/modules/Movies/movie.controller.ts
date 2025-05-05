import { JwtAuthGuard } from './../../common/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/crateMovie.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(id);
  }
  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.movieService.findByGenre(genre);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.movieService.search(query);
  }

  @Patch(':id')
  @UseGuards( AdminGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards( AdminGuard)
  deleteById(@Param('id') id: string) {
    return this.movieService.deleteById(id);
  }
}
