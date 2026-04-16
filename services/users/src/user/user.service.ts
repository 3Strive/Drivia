import { PrismaService, UserModel, UserWhereInput } from '@drivia/db';

import {
  CreateUser,
  GetUsersDto,
  PaginationData,
  UpdateUserDto,
  UtilsService,
} from '@drivia/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  findByEmail(email: string): Promise<UserModel | null> {
    return this.utilsService.asyncRpcWrapper(() =>
      this.prisma.user.findUnique({ where: { email } }),
    );
  }

  create(data: CreateUser): Promise<UserModel | null> {
    return this.utilsService.asyncRpcWrapper(() =>
      this.prisma.user.create({ data }),
    );
  }

  update(userId: string, data: UpdateUserDto): Promise<UserModel | null> {
    return this.utilsService.asyncRpcWrapper(() =>
      this.prisma.user.update({
        where: { id: userId },
        data,
      }),
    );
  }

  get(userId: string): Promise<UserModel | null> {
    return this.utilsService.asyncRpcWrapper(async () => {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      return user;
    });
  }

  getAll(searchQuery: GetUsersDto): Promise<PaginationData<Array<UserModel>>> {
    return this.utilsService.asyncRpcWrapper(async () => {
      const paginationQuery = this.utilsService.getPaginationQuery({
        page: searchQuery.page,
        page_size: searchQuery.page_size,
      });

      const where: UserWhereInput = {};

      if (searchQuery.search) {
        where.OR = [
          { email: { contains: searchQuery.search, mode: 'insensitive' } },
          { name: { contains: searchQuery.search, mode: 'insensitive' } },
        ];
      }

      const [count, rows] = await Promise.all([
        this.prisma.user.count({ where }),
        this.prisma.user.findMany({
          where,
          skip: paginationQuery.offset,
          take: paginationQuery.pageSize,
        }),
      ]);

      return this.utilsService.paginateResponse(
        paginationQuery.page,
        paginationQuery.pageSize,
        count,
        rows,
      );
    });
  }
}
