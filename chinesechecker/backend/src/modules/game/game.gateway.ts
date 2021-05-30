import {
    forwardRef,
    HttpService,
    Inject,
    Injectable,
    Logger,
  } from '@nestjs/common';
  import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { exception } from 'console';
  import { Server, Socket } from 'socket.io';
  import { GameService } from './game.service';
  import { PlayersService } from '../player/player.service';
  import { GameController } from './game.controller'
  import { Game } from '../../models/entities/game.entity';
  import { Dots } from '../../models/entities/dots.entity';



  
  interface SockClient {
    uid: string;
    sock: string;
  }

  export interface Dot {
    x: number;
    y: number;
    color: string;
    selected?: boolean;
    isMovableHere?: boolean;
  }
  
  @Injectable()
  @WebSocketGateway()
  export class GameGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        
    constructor(
      private readonly gameService: GameService,
      private readonly playersService: PlayersService,
    ) {    }
  
    private connected: Boolean = false;

    afterInit(server: Server) {
        Logger.log('Socket.IO server is running');
      }
  
    @WebSocketServer() server: Server;
  
    @SubscribeMessage('authenticate')
    async handleAuth(client: Socket, payload: string): Promise<void> {
    // verifier token et injecter le numero de la socket en db
        console.log("auth is good")
    }

    @SubscribeMessage('getGame')
    async getGame(client: Socket, GameId: number): Promise<any> {
      let a = await this.gameService.getAllDotsGame(GameId)
      client.emit("sendGame", a)
    }

    @SubscribeMessage('setPlayerCoord')
    async setPlayerCoord(client: Socket, payload: any[]): Promise<any> {
      // console.log(payload[0],"+", payload[1],"+", payload[2])
      let a = await this.playersService.updateCoord(payload[0], payload[1], payload[2])
    }

    @SubscribeMessage('changeDotPos')
    async changeDotPos(client: Socket, payload: any[]): Promise<any> {
      // console.log(payload[0],"+", payload[1],"+", payload[2])
      let dotStart : Dot = payload[2] 
      let dotEnd : Dot = payload[3]
      let playerDot : Dots[] = await this.gameService.getPlayerDotsGame(payload[0], payload[1])

      console.log(playerDot, dotStart, dotEnd)

      playerDot.map((element) => {
        (element.x === dotStart.x && element.y === dotStart.y) ? (element.x = dotEnd.x, element.y = dotEnd.y) : ""
      })

      console.log(payload[1])

      let a = await this.playersService.updateCoord(payload[0], playerDot, payload[2])
    }

  
  
    async handleDisconnect(client: Socket) {
      // enlever id de la db
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      Logger.log(`Socket client connected: ${client.id}`);
    }
  
    public async sendNotification(
      senderId: string,
    ): Promise<boolean> {
      if (!this.connected) return false;
      //const client = 
    //   if (!client) {
    //     Logger.log(
    //       `Trying to send socket notification to : ${notif.proId}, but pro is not connected`,
    //     );
    //     return false;
    //   }
  
    //   const sock = this.server.clients().sockets[client.sock];
  
    //   if (!sock) return false;
  
    //   Logger.log(`Sending socket notification to : ${notif.proId}`);
    //   sock.emit('notification', notif.title, notif.description, senderId);
      return true;
    }
  }