import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  @Prop({ required: false })
  language?: string;
  
  @Prop({ type: [String] })
  genre: string[];
  @Prop({ required: true })
  imageUrl: string;

  
  // @Prop({ enum: ['U', 'U/A 7+', 'U/A 13+', 'U/A 16+', '18+'], default: 'U' })
  // contentRating: string;
}
export const MovieSchema =SchemaFactory.createForClass(Movie)
