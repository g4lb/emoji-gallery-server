import { IsString, IsNotEmpty } from 'class-validator';

export class GetUserEmojisDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
