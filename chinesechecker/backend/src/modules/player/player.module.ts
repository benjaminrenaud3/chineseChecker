import { Module } from '@nestjs/common';
import { PlayersService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../models/entities/player.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from '../../config/app.config';
import { Dots } from '../../models/entities/dots.entity';
import { GameService } from '../game/game.service';
import { GameModule } from '../game/game.module';
import { Game } from '../../models/entities/game.entity';
import { JwtStrategy } from '../../models/strategies/jwt.strategy';

@Module({
  imports: [
  TypeOrmModule.forFeature([Player, Dots, Game]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: APP_CONFIG.secretKey,
    signOptions: { algorithm: 'HS512', expiresIn: APP_CONFIG.expiresIn },
  }),
  ],
  providers: [PlayersService, GameService, JwtStrategy],
  controllers: [PlayerController],
  exports: [PassportModule, JwtModule]
})
export class PlayersModule {}
