import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();

    Object.assign(
      this,
      this.$extends(withAccelerate()).$extends({
        model: {
          $allModels: {
            async delete<T>(this: T, args: Prisma.Args<T, 'update'>) {
              return await (this as any).update({
                ...args,
                data: { deletedAt: new Date() },
              });
            },
            async deleteMany<T>(this: T, args: Prisma.Args<T, 'updateMany'>) {
              return await (this as any).updateMany({
                ...args,
                data: { deletedAt: new Date() },
              });
            },
            async restore<T>(this: T, args: Prisma.Args<T, 'update'>) {
              return await (this as any).update({
                ...args,
                data: { deletedAt: null },
              });
            },
            async findWithDeleted<T>(
              this: T,
              args?: Prisma.Args<T, 'findMany'>,
            ) {
              return await (this as any).findMany(args);
            },
          },
        },
      }),
    );
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
