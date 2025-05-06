import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Movie } from 'src/schemas/Movieschema/movies.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({})
  age: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Movie', default: [] })
  favoriteMovies: Movie[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Movie', default: [] })
  watchedMovies: Movie[];
}

export const userSchema = SchemaFactory.createForClass(User);
