// import { Module } from '@nestjs/common';
// import { TimeOffTypesService } from './time-off-types.service';
// import { TimeOffTypesController } from './time-off-types.controller';

// @Module({
//   providers: [TimeOffTypesService],
//   controllers: [TimeOffTypesController]
// })
// export class TimeOffTypesModule {}
// src/time-off-types/time-off-types.module.ts
import { Module } from '@nestjs/common';
import { TimeOffTypesService } from './time-off-types.service';
import { TimeOffTypesController } from './time-off-types.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TimeOffTypesController],
  providers: [TimeOffTypesService, PrismaService],
  exports: [TimeOffTypesService],
})
export class TimeOffTypesModule {}
