import { IsString, IsInt, IsOptional, IsArray, IsEnum, IsUrl } from 'class-validator';
import { contentRating, Language } from '../../../utils/rating-lang.enum';
export class CreateMovieDto {
  @IsString()
  title: string;

  @IsInt()
  // @IsString()
  year: number;

  @IsString()
  description: string;

  @IsString()
  director: string;

  @IsEnum(Language)
  language: Language;

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  
  // imageUrl: string;

  @IsEnum(contentRating)
  contentRating: contentRating;

  @IsInt()
  @IsOptional() 
  viewsCount?: number; 
}
