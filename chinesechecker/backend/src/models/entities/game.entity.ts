import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id?: number

    @OneToMany(type => Player, player => player.id)
    player?: Player[];
}