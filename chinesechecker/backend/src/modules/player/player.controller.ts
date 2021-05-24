import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { coordDto, createPlayerDto, playerLoginDto } from '../../models/player/player.dto';
import { Player } from '../../models/entities/player.entity';
import { PlayersService } from './player.service';
import { JwtToken } from '../../models/strategies/jwt.token';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('player')
export class PlayerController {
    constructor(
        private playerService: PlayersService
    ) {}
    @Get()
    @ApiOkResponse({ description: 'Get all players' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async getAll(): Promise<Player[]> {
        try {
            return await this.playerService.getAll();
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':playerId')
    @ApiOkResponse({ description: 'Get a player by it\'s id' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async getOneById(@Param('playerId') playerId: number): Promise<Player> {
        try {
            return await this.playerService.findOneById(playerId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @ApiCreatedResponse({ description: 'create a player' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBody({ type: createPlayerDto })
    @ApiBearerAuth()
    async createPlayer(@Body() player: createPlayerDto): Promise<JwtToken> {
        try {
            return await this.playerService.createPlayer(player);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    @ApiCreatedResponse({ description: 'login a player' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBody({ type: playerLoginDto })
    @ApiBearerAuth()
    async logIn(@Body() player: playerLoginDto): Promise<JwtToken> {
        try {
            return await this.playerService.logIn(player);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('coordinates/:playerId')
    @ApiCreatedResponse({ description: 'update coordinates for a player' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBody({ type: coordDto })
    @ApiBearerAuth()
    async updateCoordinates(@Param('playerId') playerId: number, @Body() coords: coordDto): Promise<Player> {
        try {
            return await this.playerService.updateCoord(playerId, coords);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('coordinates/:playerId')
    @ApiOkResponse({ description: 'Get coordinates for a player' })
    @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
    @ApiBearerAuth()
    async getCoordsPlayer(@Param('playerId') playerId: number): Promise<Player> {
        try {
            return await this.playerService.getCoords(playerId);
        } catch (err) {
            throw new HttpException(err && err.message, HttpStatus.BAD_REQUEST);
        }
    }

}
