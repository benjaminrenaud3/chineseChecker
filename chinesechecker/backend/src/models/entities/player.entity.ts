import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    x?: number;

    @Column()
    y?: number;

    @Column()
    color?: string;

    @Column({nullable: true})
    selected?: boolean;

    @Column({nullable: true})
    isMovableHere?: boolean;

    @Column()
    username?: string;

    @ManyToOne(type => Game, game => game.id)
    game?: Game;
}