import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../../models/entities/game.entity';
import { Player } from '../../models/entities/player.entity';
import { Dots } from '../../models/entities/dots.entity';
import { PlayersModule } from '../player/player.module';
import { PlayersService } from '../player/player.service';
import { GameGateway } from "./game.gateway"

@Module({
  imports: [TypeOrmModule.forFeature([Game, Player, Dots]), PlayersModule],
  providers: [GameService, GameGateway, PlayersService],
  controllers: [GameController]
})
export class GameModule {}
