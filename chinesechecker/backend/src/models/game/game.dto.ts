import { IsNotEmpty, MinLength } from "class-validator";
import { Game } from "../entities/game.entity";
import { ApiProperty } from '@nestjs/swagger';
import { Player } from "../entities/player.entity";

export class createGameDto {
    @IsNotEmpty()
    @ApiProperty({ type: Player, description: 'Array of entity player' })
    player?: Player[];
}