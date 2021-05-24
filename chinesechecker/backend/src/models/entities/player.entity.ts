import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: 0 })
    x?: number;

    @Column({ default: 0 })
    y?: number;

    @Column({ nullable: true })
    color?: string;

    @Column({nullable: true})
    selected?: boolean;

    @Column({nullable: true})
    isMovableHere?: boolean;

    @Column()
    username?: string;

    @Column({ select: false })
    password?: string;

    @Column({ select: false })
    salt?: string;

    @ManyToOne(type => Game, game => game.id)
    @JoinColumn()
    game?: Game;
}