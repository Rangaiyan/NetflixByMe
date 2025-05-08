import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieSchema } from '../../schemas/Movieschema/movies.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryProvider } from 'src/config/cloudinary.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    AuthModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, CloudinaryProvider],
})
export class MovieModule {}