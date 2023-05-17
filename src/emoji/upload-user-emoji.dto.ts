import { IsString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { UserType } from 'src/user/user.schema';
import { EmojiType } from './emoji.schema';

export class UploadUserEmojiDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  emojiId: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  userTtype: UserType;

  @IsString()
  name: string;

  @IsString()
  imageUrl: string;

  @IsString()
  @IsEnum(EmojiType)
  type: EmojiType;

  @IsInt()
  order: number;
}
