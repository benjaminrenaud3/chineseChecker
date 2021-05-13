import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createPlayerDto } from '../../models/player/player.dto';
import { Repository } from 'typeorm';
import { Player } from '../../models/entities/player.entity';
import { JwtPayload } from '../../models/strategies/jwt.payload';
import { JwtToken } from '../../models/strategies/jwt.token';
import { APP_CONFIG } from 'src/config/app.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player) public readonly userRepository: Repository<Player>,
        private jwtService: JwtService
    ) {}

    async getAll(): Promise<Player[]> {
        return await this.userRepository.find({});
    }

    async findOneById(id: number): Promise<Player> {
        const player = await this.userRepository.findOne(id);
        if (!player) {
            throw new Error('no player to show with this id');
        }
        return player;
    }

    async findOneByUsername(username: string): Promise<Player> {
        return await this.userRepository.findOne({username: username});
    }

    async createPlayer(player: createPlayerDto): Promise<JwtToken> {
        if (await this.findOneByUsername(player.username)) {
            throw new Error('this username already exist, pleache chose another one');
        }
        const createdPlayer: Player = await this.userRepository.save(player);
        return this.createJwtPayload(createdPlayer);
    }

    async validateUserByJwt(payload: JwtPayload) {
        const player = await this.findOneByUsername(payload.username);
        return this.createJwtPayload(player);
    }

    createJwtPayload(player: Player): JwtToken {
        const data: JwtPayload = {
          username: player.username
        };
        const jwt = this.jwtService.sign(data);
        return {
          token: jwt,
          expireDate: new Date(Date.now() + APP_CONFIG.expiresIn * 1000).valueOf(),
          player,
        };
      }
}
