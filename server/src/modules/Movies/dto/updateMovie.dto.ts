// src/movie/dto/update-movie.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './crateMovie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
