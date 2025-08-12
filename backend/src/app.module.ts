import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TeamsModule } from './teams/teams.module';
import { StatusesModule } from './statuses/statuses.module';
import { ProjectsModule } from './projects/projects.module';
import { TimeOffTypesModule } from './time-off-types/time-off-types.module';


@Module({
  imports: [PrismaModule, TeamsModule, StatusesModule, ProjectsModule, TimeOffTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
