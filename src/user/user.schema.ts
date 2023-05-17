import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum UserType {
  FREE = 'Free',
  PREMIUM = 'Premium',
  BUSINESS = 'Business',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, enum: UserType })
  type: UserType;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Emoji' }] })
  emojis: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
