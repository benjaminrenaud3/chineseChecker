import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createGameDto } from '../../models/game/game.dto';
import { Repository } from 'typeorm';
import { Game } from '../../models/entities/game.entity';
import { Player } from '../../models/entities/player.entity';
import { Dots } from '../../models/entities/dots.entity';


@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game) public readonly gameRepository: Repository<Game>,
        @InjectRepository(Player) public readonly playerRepository: Repository<Player>,
        @InjectRepository(Dots) public readonly dotsRepository: Repository<Dots>,

    ) {}

    async getAll(): Promise<Game[]> {
        const games = await this.gameRepository.find({ relations: ['player'] });
        if (!games) {
            throw new Error('no games to show');
        }
        return games;
    }

    async createGame(playerId: number[]): Promise<Game> {
        let playerArray: Player[] = [];
        if (playerId.length > 6) {
            throw new Error('you cannot create a game with more than six players');
        }
        for (let count = 0; count < playerId.length; count++) {
            const player = await this.playerRepository.findOne(playerId[count]);
            if (!player) {
                throw new Error('the player you try to add to the game does not exist');
            }
            playerArray.push(player);
        }
        const game = await this.gameRepository.create({ player: playerArray});
        await this.gameRepository.save(game);
        return game;
    }

    async joinGame(gameId: number, playerId: number): Promise<Game> {
        const game = await this.gameRepository.findOne(gameId, { relations: ['player'] });
        if (!game) {
            throw new Error('no game with this id');
        }
        const player = await this.playerRepository.findOne(playerId);
        if (!player) {
            throw new Error('no player to add with this id');
        }
        game.player.forEach(
            (element) => {
                if (element.id == playerId) {
                    throw new Error('this player is already in this game');
                }
            }
        );
        game.player.push(player);
        await this.gameRepository.save(game);
        return await this.gameRepository.findOne(gameId, { relations: ['player'] });
    }

    async quitGame(gameId: number, playerId: number): Promise<Game> {
        let count = 0;
        const game = await this.gameRepository.findOne(gameId, { relations: ['player'] });
        if (!game) {
            throw new Error('no game with this id');
        }
        const player = await this.playerRepository.findOne(playerId);
        if (!player) {
            throw new Error('no player to remove with this id');
        }
        game.player.forEach(
            (element) => {
                if (element.id == playerId) {
                    game.player.splice(count, 1);
                }
                count++;
            }
        );
        await this.gameRepository.save(game);
        return await this.gameRepository.findOne(gameId, { relations: ['player'] });
    }

    async getAllPlayersGame(gameId: number): Promise<Game> {
        const game = await this.gameRepository.findOne(gameId, { relations: ['player'] });
        const dots = await this.dotsRepository.find({where: {gameId:9}})


        // console.log(gameId, dots)

        if (!game) {
            throw new Error('no game to show with this id');
        }
        return game;
    }

    async getAllDotsGame(gameId: number): Promise<Dots[]> {
        const dots = await this.dotsRepository.find({where: {gameId:gameId}})
        // console.log(gameId, dots)

        if (!dots) {
            throw new Error('no dots in game to show with this id');
        }
        return dots;
    }

    async getPlayerDotsGame(playerId: number, gameId: number): Promise<Dots[]> {
        // console.log(gameId, playerId)

        const dots = await this.dotsRepository.find({where: {gameId:gameId, player:playerId}})

        if (!dots) {
            throw new Error('no dots in game to show with this id');
        }
        return dots;
    }
}
