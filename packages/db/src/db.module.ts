import { Global, Module } from '@nestjs/common';

import { PrismaService } from './db.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService],
})
export class DBModule {}
