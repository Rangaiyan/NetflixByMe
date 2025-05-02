import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  password: string;

  @Prop({ default: false })  
  isAdmin: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);


// userSchema.virtual('id').get(function () {
//   return this._id.toHexString();
// });


// userSchema.set('toJSON', {
//   virtuals: true,
// });
