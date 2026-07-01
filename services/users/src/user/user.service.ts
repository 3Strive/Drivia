import { PrismaService, Prisma, User } from '@drivia/db';

import {
  CreateUser,
  GetUsersDto,
  PaginationData,
  UpdateUserDto,
  UtilsService,
} from '@drivia/utils';
import * as bcrypt from 'bcrypt';
import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService,
  ) {}

  findByEmail(email: string): Promise<User | null> {
    return this.utilsService.asyncRpcWrapper(() =>
      this.prisma.user.findUnique({ where: { email } }),
    );
  }

  async create(data: CreateUser): Promise<User | null> {
    const check = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { phoneNumber: data.phoneNumber },
          { businessName: data.businessName },
        ],
      },
    });

    if (check) {
      let conflictField: string;
      if (check.email === data.email) {
        conflictField = 'Email';
      } else if (check.phoneNumber === data.phoneNumber) {
        conflictField = 'Phone number';
      } else {
        conflictField = 'Business name';
      }

      throw new RpcException({
        statusCode: HttpStatus.CONFLICT,
        message: `${conflictField} already in use`,
      });
    }

    const password = await bcrypt.hash(data.password, 10);
    const userWithHash = { ...data, password };

    const user = await this.utilsService.asyncRpcWrapper(() =>
      this.prisma.user.create({ data: userWithHash }),
    );

    return user;
  }

  update(userId: string, data: UpdateUserDto): Promise<User | null> {
    return this.utilsService.asyncRpcWrapper(() =>
      this.prisma.user.update({
        where: { id: userId },
        data,
      }),
    );
  }

  get(userId: string): Promise<User | null> {
    return this.utilsService.asyncRpcWrapper(async () => {
      const user = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      return user;
    });
  }

  getAll(searchQuery: GetUsersDto): Promise<PaginationData<Array<User>>> {
    return this.utilsService.asyncRpcWrapper(async () => {
      const paginationQuery = this.utilsService.getPaginationQuery({
        page: searchQuery.page,
        page_size: searchQuery.page_size,
      });

      const where: Prisma.UserWhereInput = {};

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
