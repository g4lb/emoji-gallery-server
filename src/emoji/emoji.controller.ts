import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  ForbiddenException,
  NotFoundException,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmojiDto } from './emoji.dto';
import { Emoji, EmojiDocument, EmojiType } from './emoji.schema';
import { User, UserDocument, UserType } from 'src/user/user.schema';
import { UploadUserEmojiDto } from './upload-user-emoji.dto';
import { UpdateEmojiOrderDto } from './update-emoji-order.dto';
import { UpdateEmojiActiveDto } from './update-emoji-active.dto';
import { GetUserEmojisDto } from './get-user-emojis.dto';

@Controller('emoji')
export class EmojiController {
  constructor(
    @InjectModel(Emoji.name) private emojiModel: Model<EmojiDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @Post('uploadUserEmoji')
  async uploadUserEmoji(@Body() uploadUserEmojiDto: UploadUserEmojiDto) {
    const userOwn = await checkIfUsersExsits(uploadUserEmojiDto.userId);
    const userEmojiSize = userOwn.emojis.length();

    if (userOwn.type === UserType.FREE) {
      if (userEmojiSize >= 5) {
        throw new ForbiddenException('Free users can only add up to 5 emojis.');
      }
    } else if (userOwn.type === UserType.PREMIUM) {
      if (userEmojiSize >= 100) {
        throw new ForbiddenException(
          'Premium users can only add up to 100 emojis.',
        );
      }

      let uploadedEmoji = await this.emojiModel
        .findById(uploadUserEmojiDto.emojiId)
        .exec();
      if (!uploadedEmoji) {
        const emojiDto: EmojiDto = {
          id: uploadUserEmojiDto.emojiId,
          name: uploadUserEmojiDto.name,
          imageUrl: uploadUserEmojiDto.imageUrl,
          type: uploadUserEmojiDto.type,
          order: uploadUserEmojiDto.order,
        };
        uploadedEmoji = await this.uploadEmojiToDb(emojiDto);
      }

      userOwn.emojis.add(uploadedEmoji.id);
      await userOwn.save();
    }
  }

  @Post('uploadEmoji')
  async uploadEmoji(@Body() emojiDto: EmojiDto) {
    const emoji = await this.uploadEmojiToDb(emojiDto);
    return emoji;
  }

  @Post('updateEmojiOrder')
  async updateEmojiOrder(@Body() updateEmojiOrderDto: UpdateEmojiOrderDto) {
    const emoji = await this.emojiModel
      .findOne({ _id: updateEmojiOrderDto.emojiId })
      .exec();
    if (!emoji) {
      throw new NotFoundException(
        'Emoji not found or you do not have permission to update it',
      );
    }

    emoji.order = updateEmojiOrderDto.order;
    await emoji.save();
  }

  @Post('updateEmojiActive')
  async updateEmojiActive(@Body() updateEmojiActiveDto: UpdateEmojiActiveDto) {
    const emoji = await this.emojiModel
      .findOne({ _id: updateEmojiActiveDto.emojiId })
      .exec();
    if (!emoji) {
      throw new NotFoundException(
        'Emoji not found or you do not have permission to update it',
      );
    }

    emoji.isActive = updateEmojiActiveDto.isActive;
    await emoji.save();
  }

  @Delete('deleteEmoji')
  async deleteEmoji(@Param('id') id: string, @Req() req): Promise<string> {
    const emoji = await this.emojiModel.findById(id).exec();
    if (!emoji) {
      throw new NotFoundException('Emoji not found.');
    }

    await this.emojiModel
      .findByIdAndUpdate(id, { $pull: { owners: req.user._id } })
      .exec();

    return 'Emoji deleted successfully';
  }

  @Get('getUserEmojis')
  @UseInterceptors(CacheInterceptor)
  async getUserEmojis(
    @Body() getUserEmojisDto: GetUserEmojisDto,
  ): Promise<Emoji[]> {
    const userOwn = await checkIfUsersExsits(getUserEmojisDto.userId);
    let emojis: Emoji[];

    if (userOwn.type === EmojiType.FREE) {
      emojis = await this.emojiModel
        .find({ type: EmojiType.FREE, isActive: true })
        .sort('order')
        .exec();
    } else if (userOwn.type === EmojiType.PREMIUM) {
      emojis = await this.emojiModel
        .find({
          $or: [{ type: EmojiType.FREE }, { type: EmojiType.PREMIUM }],
          isActive: true,
        })
        .sort('order')
        .exec();
    } else if (userOwn.type === EmojiType.BUSINESS) {
      emojis = await this.emojiModel
        .find({ isActive: true })
        .sort('order')
        .exec();
    }

    return emojis;
  }

  private async uploadEmojiToDb(emojiDto: EmojiDto) {
    const uploadedEmoji = await this.emojiModel.findById(emojiDto.id).exec();
    if (uploadedEmoji) {
      throw new NotFoundException('Emoji is already exsits');
    }

    const emoji = new this.emojiModel({
      id: emojiDto.id,
      name: emojiDto.name,
      imageUrl: emojiDto.imageUrl,
      type: emojiDto.type,
      order: emojiDto.order,
    });

    await emoji.save();
    return emoji;
  }
}

async function checkIfUsersExsits(userId: string) {
  const userOwn = await this.userModel.findById(userId).exec();
  if (!userOwn) {
    throw new NotFoundException('User not found.');
  }
  return userOwn;
}
