import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';


@Entity()
export class Dots {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: 0 })
    x?: number;

    @Column({ default: 0 })
    y?: number;

    @Column()
    color?: string;
    
    @Column()
    isSelected?: boolean;

    @Column()
    isMovableHere?: boolean;

    @Column()
    gameId?: number;

    @ManyToOne(type => Player, player => player.id)
    @JoinColumn()
    player?: Player;
}