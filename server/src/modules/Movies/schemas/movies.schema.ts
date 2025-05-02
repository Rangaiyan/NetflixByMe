import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { contentRating, Language } from '../../../utils/rating-lang.enum';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  title: string;
  @Prop()
  year: number;
  @Prop()
  description: string;
  @Prop()
  director: string;
  @Prop({ enum: Language, required: false })
  language: Language;
  @Prop({ type: [String] })
  genre: string[];
  @Prop({ required: true })
  imageUrl: string;
  @Prop({ enum: contentRating, default: contentRating.U })
  contentRating: contentRating;
  @Prop({ default: 0 })
  viewsCount: number;
}
export const MovieSchema = SchemaFactory.createForClass(Movie);
