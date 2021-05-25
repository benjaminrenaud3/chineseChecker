import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_CONFIG } from './config/database.config';
import { GameModule } from './modules/game/game.module';
import { PlayersModule } from './modules/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({...DATABASE_CONFIG}),
    PlayersModule,
    GameModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
