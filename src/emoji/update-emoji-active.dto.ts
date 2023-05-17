import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateEmojiActiveDto {
  @IsNotEmpty()
  @IsString()
  emojiId: string;

  @IsBoolean()
  isActive: boolean;
}
