import { Module } from '@nestjs/common';
import { PlayersService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../../models/entities/player.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_CONFIG } from '../../config/app.config';

@Module({
  imports: [TypeOrmModule.forFeature([Player]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: APP_CONFIG.secretKey,
    signOptions: { algorithm: 'HS512', expiresIn: APP_CONFIG.expiresIn },
  }),
  ],
  providers: [PlayersService],
  controllers: [PlayerController]
})
export class PlayersModule {}
