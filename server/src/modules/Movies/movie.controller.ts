import { JwtAuthGuard } from './../../common/guards/auth.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/crateMovie.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Movie } from 'src/schemas/Movieschema/movies.schema';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('InsertOne')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    try {
      const movie = await this.movieService.create(image, createMovieDto);
      return movie;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw new BadRequestException('Failed to create movie.');
    }
  }

  @UseGuards(AdminGuard)
  @Post('insertMany')
  async createBulk(@Body() movies: CreateMovieDto[]) {
    return this.movieService.createMany(movies);
  }
  @Get('trending')
  async getTrending(): Promise<Movie[]> {
    return this.movieService.getTrendingMovies();
  }

  @Patch('update/:id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete('delete/:id')
  @UseGuards(AdminGuard)
  deleteById(@Param('id') id: string) {
    return this.movieService.deleteById(id);
  }
  @Delete('deleteAll')
  @UseGuards(AdminGuard)
  deleteAll() {
    return this.movieService.deleteAll();
  }

  @Get('list')
  async paginaton(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
    @Query('orderBy') orderBy: 'asc' | 'desc',
  ) {
    const paginationDef = {
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      sort: sort || 'title',
      orderBy: orderBy === 'desc' ? -1 : 1,
    };

    console.log('Pagination Query:', paginationDef);

    return this.movieService.findAllWithPagination(paginationDef);
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

  @Get('language/:lang')
  findByLang(@Param('lang') lang: string) {
    return this.movieService.findByLanguage(lang);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.movieService.search(query);
  }

}
