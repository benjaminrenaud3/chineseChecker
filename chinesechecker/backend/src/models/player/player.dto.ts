import { IsNotEmpty } from "class-validator";
import { Game } from "../entities/game.entity";

export class createPlayerDto {
    @IsNotEmpty()
    x?: number;
    @IsNotEmpty()
    y?: number;
    @IsNotEmpty()
    color?: string;
    selected?: boolean;
    isMovableHere?: boolean;
    @IsNotEmpty()
    username?: string;
    game?: Game;
}