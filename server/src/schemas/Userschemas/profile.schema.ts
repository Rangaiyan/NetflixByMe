import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from '../Userschemas/user.schema';
import { Movie } from '../Movieschema/movies.schema';

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Movie.name }], default: [] })
  favoriteMovies: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Movie.name }], default: [] })
  watchedMovies: Types.ObjectId[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
