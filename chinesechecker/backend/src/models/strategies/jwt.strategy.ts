import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { APP_CONFIG } from '../../config/app.config';
import { PlayersService } from '../../modules/player/player.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly playerService: PlayersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_CONFIG.secretKey,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    try {
      return await this.playerService.validateUserByJwt(payload);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
