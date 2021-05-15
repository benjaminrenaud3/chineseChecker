import { IsNotEmpty } from "class-validator";
import { Game } from "../entities/game.entity";
import { ApiProperty } from '@nestjs/swagger';

export class createPlayerDto {
    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'coordinate X' })
    x?: number;
    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'coordinate Y' })
    y?: number;
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'color' })
    color?: string;
    @ApiProperty({ type: Boolean, description: 'selected', required: false })
    selected?: boolean;
    @ApiProperty({ type: Boolean, description: 'isMovableHere', required: false })
    isMovableHere?: boolean;
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'username' })
    username?: string;
    @ApiProperty({ type: Game, description: 'entity game', required: false })
    game?: Game;
}