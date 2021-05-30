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
  import { PlayersService } from './player.service';
  import { PlayerController } from './player.controller'
  import { Game } from '../../models/entities/game.entity';
  import { coordDto, createPlayerDto, playerLoginDto } from '../../models/player/player.dto';



  
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
  export class PlayerGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        
    constructor(
      private readonly playerService: PlayersService,
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

    @SubscribeMessage('setPlayerCoord')
    async setPlayerCoord(client: Socket, payload: string): Promise<void> {
    // verifier token et injecter le numero de la socket en db
      console.log("payload")
      // let a = await this.playerService.updateCoord(playerId, coord, gameId)
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