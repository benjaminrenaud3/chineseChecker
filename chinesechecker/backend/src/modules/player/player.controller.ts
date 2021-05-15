import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { createPlayerDto } from '../../models/player/player.dto';
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

}
