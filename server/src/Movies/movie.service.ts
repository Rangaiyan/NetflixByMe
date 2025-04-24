import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import* as mongoose from 'mongoose';
import { Movie } from './schemas/movies.schema';
import { NotFoundError } from 'rxjs';


@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel:mongoose.Model<Movie>){}


    async findAll():Promise<Movie[]>{
      const movie=await this.movieModel.find();
      return movie
    }

    async create(movie:Movie):Promise<Movie>{
      const res= await this.movieModel.create(movie)
      return res
    }
    async findById(id:String):Promise<Movie>{
      const mov_id= await this.movieModel.findById(id)
      if(!mov_id){
        throw new NotFoundError('movie is not found')
      }
      return mov_id
    }
   
}
