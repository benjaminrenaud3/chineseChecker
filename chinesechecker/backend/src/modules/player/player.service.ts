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
import { Dots } from '../../models/entities/dots.entity';
import { GameService } from '../game/game.service';

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(Player) public readonly userRepository: Repository<Player>,
        @InjectRepository(Dots) public readonly dotsRepository: Repository<Dots>,
        private jwtService: JwtService,
        private gameService: GameService
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
        const dotsArray: Dots[] = [];
        for (var x = 0; x < 10; x++) {
            dotsArray.push(new Dots());
        }
        const playerToCreate: Player = {
            ...player,
            dots: dotsArray
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

    async updateCoord(playerId: number, coord: coordDto[], gameId: number): Promise<Player> {
        var shouldSkip = false;
        const player = await this.userRepository.findOne(playerId);
        if (!player) {
            throw new Error('no player to update');
        }
        let coordsArray: Dots[] = [];
        coord.forEach(
            async (element) => {
                coordsArray.push(element);
            }
        )
        for (var x = 0; x < coordsArray.length; x++) {
            coordsArray[x].player = player;
            coordsArray[x].gameId = gameId;
        }
        const coordinates = await this.dotsRepository.find({ where: { player: player } });
        if (coordinates.length) {
            let count = 0;
            coordinates.forEach(
                async (element) => {
                    if (gameId == element.gameId) {
                        var toUpdate = await this.dotsRepository.findOne(element.id);
                        await this.dotsRepository.remove(toUpdate);      
                        await this.dotsRepository.save(coordsArray[count++]);
                    } else {
                        if (shouldSkip == false) {
                            shouldSkip = true;
                            await this.dotsRepository.save(coordsArray);
                        }
                    }
                }
            );    
        } else {
            await this.dotsRepository.save(coordsArray);
        }
        return await this.userRepository.findOne(playerId);
    }

    async getCoords(playerId): Promise<Player> {
        const player = await this.userRepository.findOne(playerId, { relations: ['dots'], select: ['id'] });
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
