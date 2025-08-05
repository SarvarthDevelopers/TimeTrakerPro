// /* eslint-disable prettier/prettier */
// // import { Injectable } from '@nestjs/common';

// // @Injectable()
// // export class PrismaService {}
// import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient {
//   private _statuses: any;
//   public get statuses(): any {
//     return this._statuses;
//   }
//   public set statuses(value: any) {
//     this._statuses = value;
//   }
//   constructor() {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//     super();
//   }
// }

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
