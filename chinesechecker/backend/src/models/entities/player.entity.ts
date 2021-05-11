import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => Game, game => game.id)
    game?: Game;
}