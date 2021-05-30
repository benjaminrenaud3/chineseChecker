export interface Game {
  id?: number;

  player?: Player[];
}

export interface Player {
  id?: number;

  x?: number;

  y?: number;

  color?: string;

  selected?: boolean;

  isMovableHere?: boolean;

  username?: string;

  password?: string;

  salt?: string;

  socketId?: string;
}
export interface LoginRes {
  token: string;
  expireDate: number;
  player?: Player;
}

export interface coordDto {
  x?: number;

  y?: number;

  color?: string;

  isSelected?: boolean;

  isMovableHere?: boolean;

  gameId?: number;
}
