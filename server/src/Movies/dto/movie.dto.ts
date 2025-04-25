import { IsString, IsInt, IsOptional, IsArray, IsEnum, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsInt()
  year: number;

  @IsString()
  description: string;

  @IsString()
  director: string;

  @IsString()
  language: string; // remove @IsOptional()
  

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  @IsUrl()
  imageUrl: string;

  // @IsEnum(['U', 'U/A 7+', 'U/A 13+', 'U/A 16+', '18+'])
  // @IsOptional() 
  // contentRating?: string;
}
