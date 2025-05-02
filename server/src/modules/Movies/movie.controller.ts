import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/crateMovie.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Controller('movies') // REST best practice: plural
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  
  @Post()
  // @UseGuards(AdminGuard)
  create(@Body() createMovieDto:CreateMovieDto){
    return this.movieService.create(createMovieDto)
  }

  @Get()
  findAll(){
    return this.movieService.findAll();
  }
  
  @Get(':id')
    findOne(@Param('id') id :string){
      return this.movieService.findOne(id);
    }

  @Patch('id')
  @UseGuards(AdminGuard)
  update(@Param('id') id:string,@Body() updateMovieDto:UpdateMovieDto){
    return this.update(id,updateMovieDto);
  }

  @Delete('id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id:string){
    return this.movieService.remove(id);
  }

  


}
