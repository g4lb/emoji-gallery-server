import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEmojiOrderDto {
  @IsNotEmpty()
  @IsString()
  emojiId: string;

  @IsNumber()
  order: number;
}
