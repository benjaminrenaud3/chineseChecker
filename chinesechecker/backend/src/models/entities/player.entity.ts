import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dots } from './dots.entity';
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

    @OneToMany(type => Dots, dots => dots.player)
    dots?: Dots[];

    @Column()
    socketId?: string;
}