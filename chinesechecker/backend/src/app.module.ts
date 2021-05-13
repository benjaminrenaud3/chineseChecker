import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_CONFIG } from './config/database.config';
import { PlayersModule } from './modules/player/player.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({...DATABASE_CONFIG}),
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
