import { JwtAuthGuard } from './../../common/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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

  @UseGuards(AdminGuard)
  @Post('bulk')
  async createBulk(@Body() movies: CreateMovieDto[]) {
    return this.movieService.createMany(movies);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  deleteById(@Param('id') id: string) {
    return this.movieService.deleteById(id);
  }

  @Get('list')
  async paginaton(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
    @Query('orderBy') orderBy: 'asc' | 'desc'
  ) {
    const paginationDef = {
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      sort: sort || 'title',
      orderBy: orderBy === 'desc' ? -1 as const : 1 as const,
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
