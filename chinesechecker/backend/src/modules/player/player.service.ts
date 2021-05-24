import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coordDto, createPlayerDto, playerLoginDto } from '../../models/player/player.dto';
import { Repository } from 'typeorm';
import { Player } from '../../models/entities/player.entity';
import { JwtPayload } from '../../models/strategies/jwt.payload';
import { JwtToken } from '../../models/strategies/jwt.token';
import { APP_CONFIG } from '../../config/app.config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';   

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
        const playerToCreate: Player = {
            ...player
        };
        playerToCreate.salt = await bcrypt.genSalt();
        playerToCreate.password = await bcrypt.hash(player.password, playerToCreate.salt);
        const createdPlayer: Player = await this.userRepository.save(playerToCreate);
        return this.createJwtPayload(createdPlayer);
    }

    async logIn(player: playerLoginDto): Promise<JwtToken> {
        const playerFound = await this.validatePlayerByPassword(player);
        return this.createJwtPayload(playerFound);
    }

    async validatePlayerByPassword(player: playerLoginDto): Promise<Player> {
        const username = player.username;
        const playerToCheck = await this.userRepository
        .createQueryBuilder('player')
        .where('player.username = :username', { username })
        .select(['player.salt'])
        .getOne();
        
        if (!playerToCheck) {
            throw new Error('salt not found for this player');
        }
        const hashedPwd = await bcrypt.hash(player.password, playerToCheck.salt);
        return this.findMatchUsernamePwd(player.username, hashedPwd);
    }

    async updateCoord(playerId: number, coord: coordDto): Promise<Player> {
        const player = await this.userRepository.findOne(playerId);
        if (!player) {
            throw new Error('no player to update');
        }
        const payload: coordDto = {
            x: coord.x === undefined ? player.x : coord.x,
            y: coord.y === undefined ? player.y : coord.y
        };
        await this.userRepository.update(playerId, payload);
        return await this.userRepository.findOne(playerId);
    }

    async getCoords(playerId): Promise<Player> {
        const player = await this.userRepository.findOne(playerId, { select: ['x', 'y'] });
        if (!player) {
            throw new Error('no player with this id');
        }
        return player;
    }

    async findMatchUsernamePwd(username: string, password: string): Promise<Player> {
        const player = await this.userRepository.findOne(null, {
            where: { username, password },
        });
        if (!player) {
            throw new Error('Wrong username or password');
        }
        return player;
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
