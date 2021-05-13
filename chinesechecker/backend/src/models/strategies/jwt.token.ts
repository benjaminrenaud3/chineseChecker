import { Player } from "../entities/player.entity";

export class JwtToken {
    token: string;
    expireDate: number;
    player?: Player;
  }