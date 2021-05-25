import { IsNotEmpty, MinLength } from "class-validator";
import { Game } from "../entities/game.entity";
import { ApiProperty } from '@nestjs/swagger';
import { Dots } from "../entities/dots.entity";

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
    @ApiProperty({ type: Dots, description: 'entity dots', required: false })
    dots?: Dots;
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

    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'color' })
    color?: string;

    @ApiProperty({ type: Boolean, description: 'isSelected' })
    isSelected?: boolean;

    @ApiProperty({ type: Boolean, description: 'isMovableHere' })
    isMovableHere?: boolean;

    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'gameId' })
    gameId?: number;
}