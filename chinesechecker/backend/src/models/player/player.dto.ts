import { IsNotEmpty, MinLength } from "class-validator";
import { Game } from "../entities/game.entity";
import { ApiProperty } from '@nestjs/swagger';

export class createPlayerDto {
    @ApiProperty({ type: Number, description: 'coordinate X', required: false })
    x?: number;
    @ApiProperty({ type: Number, description: 'coordinate Y', required: false })
    y?: number;
    @ApiProperty({ type: String, description: 'color', required: false })
    color?: string;
    @ApiProperty({ type: Boolean, description: 'selected', required: false })
    selected?: boolean;
    @ApiProperty({ type: Boolean, description: 'isMovableHere', required: false })
    isMovableHere?: boolean;
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'username' })
    username?: string;
    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'password' })
    password?: string;
    @ApiProperty({ type: Game, description: 'entity game', required: false })
    game?: Game;
}

export class playerLoginDto {
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'username' })
    username?: string;

    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({ type: String, description: 'password' })
    password?: string;
}

export class coordDto {
    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'coordX' })
    x?: number;

    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'coordY' })
    y?: number;
}