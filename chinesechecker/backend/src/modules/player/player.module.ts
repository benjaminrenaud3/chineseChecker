import { Module } from '@nestjs/common';
import { PlayersService } from './player.service';

@Module({
  providers: [PlayersService]
})
export class PlayersModule {}
