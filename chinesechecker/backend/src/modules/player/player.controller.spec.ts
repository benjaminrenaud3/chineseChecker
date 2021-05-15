import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APP_CONFIG } from '../../config/app.config';
import { Repository } from 'typeorm';
import { Player } from '../../models/entities/player.entity';
import { PlayerController } from './player.controller';
import { PlayersService } from './player.service';
import { PassportModule } from '@nestjs/passport';
import { createPlayerDto } from '../../models/player/player.dto';

describe('Player Controller', () => {
  let controller: PlayerController;
  let repo: Repository<Player>;
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: APP_CONFIG.secretKey,
        signOptions: { algorithm: 'HS512', expiresIn: APP_CONFIG.expiresIn },
      })],
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    })
    .compile();

    controller = module.get<PlayerController>(PlayerController);
    repo = module.get<Repository<Player>>(getRepositoryToken(Player));
    service = module.get<PlayersService>(PlayersService);
  });

  afterEach(() => {
    jest.resetAllMocks()
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw an error with a message about the username which already exist', async () => {
    const player: createPlayerDto = {
      x: 0,
      y: 0,
      color: "blue",
      username: "test1"
    };
    try {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(player);
      await service.createPlayer(player);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('this username already exist, pleache chose another one');
    }
  });

  it('should create a player', async () => {
    const player: createPlayerDto = {
      x: 0,
      y: 0,
      color: "blue",
      username: "test"
    };
    repo.findOne = jest.fn(() => {return null;});
    repo.save = jest.fn().mockImplementation(player => Promise.resolve({...player}));
    const result = await service.createPlayer(player);
    expect(result instanceof Object).toBe(true);
  });

  it('should return a player by it\s id', async () => {
    const player: Player = {
      id: 2
    };
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(player);
    expect(await service.findOneById(player.id)).toEqual({
      id: 2
    });
  });

  it('should return all players', async () => {
    repo.find = jest.fn().mockImplementation(players => players)
    const result = await service.getAll();
    expect(result instanceof Object).toBe(true);
  });
});
