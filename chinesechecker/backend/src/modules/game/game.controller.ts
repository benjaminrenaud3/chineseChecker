import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Game } from '../../models/entities/game.entity';
import { Dots } from '../../models/entities/dots.entity';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(
        private gameService: GameService
    ) {}

    @Get()
    @ApiOkResponse({ description: 'Get all players' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async getAll(): Promise<Game[]> {
        try {
            return await this.gameService.getAll();
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    //@UseGuards(AuthGuard())
    @Post()
    @ApiOkResponse({ description: 'create a game' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async createGame(@Body('playerId') playerId: number[]): Promise<Game> {
        try {
            return await this.gameService.createGame(playerId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('join/:gameId/:playerId')
    @ApiOkResponse({ description: 'join a game' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async joinGame(@Param('gameId') gameId: number, @Param('playerId') playerId: number): Promise<Game> {
        try {
            return await this.gameService.joinGame(gameId, playerId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('quit/:gameId/:playerId')
    @ApiOkResponse({ description: 'quit a game' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async quitGame(@Param('gameId') gameId: number, @Param('playerId') playerId: number): Promise<Game> {
        try {
            return await this.gameService.quitGame(gameId, playerId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('players/:gameId')
    @ApiOkResponse({ description: 'Get all players for a game' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async getAllPlayersGame(@Param('gameId') gameId: number): Promise<Game> {
        try {
            return await this.gameService.getAllPlayersGame(gameId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('dots/:gameId')
    @ApiOkResponse({ description: 'Get all dots for a game' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async getAllDotsGame (@Param('gameId') gameId: number): Promise<Dots[]> {
        try {
            return await this.gameService.getAllDotsGame(gameId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('dots/:players/:gameId')
    @ApiOkResponse({ description: 'Get player dots for a game' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async getPlayerDotsGame (@Param('gameId') gameId: number, @Param('playerId') playerId: number): Promise<Dots[]> {
        try {
            return await this.gameService.getPlayerDotsGame(gameId, playerId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }
}


