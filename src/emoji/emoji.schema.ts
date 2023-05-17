import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum EmojiType {
  FREE = 'Free',
  PREMIUM = 'Premium',
  BUSINESS = 'Business',
}

export type EmojiDocument = Emoji & Document;

@Schema()
export class Emoji {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true, enum: EmojiType })
  type: EmojiType;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  isActive: boolean;
}

export const EmojiSchema = SchemaFactory.createForClass(Emoji);
