import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmojiController } from './emoji/emoji.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisCacheProvider } from './core/cache.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisCacheProvider,
      }),
    }),
  ],
  controllers: [EmojiController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
