import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps:true
})
export class User extends Document {
  
  @Prop({ required: true, unique: true })
  email: String;
  @Prop({ required: true })
  password: String;
  @Prop({ type: [Types.ObjectId], ref: 'Movie', default: [] })
  favorites: Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
