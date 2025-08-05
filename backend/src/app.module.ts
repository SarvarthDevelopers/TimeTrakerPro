import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TeamsModule } from './teams/teams.module';
import { StatusesModule } from './statuses/statuses.module';

@Module({
  imports: [PrismaModule, TeamsModule, StatusesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
