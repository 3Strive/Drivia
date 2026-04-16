import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { randomBytes } from 'crypto';

import { PaginationData, PaginationQuery, PaginationQueryDto } from './dto';

@Injectable()
export class UtilsService {
  generateResetToken(): string {
    return randomBytes(32).toString('hex');
  }

  generateRandomString(): string {
    return randomBytes(32).toString('hex');
  }

  generateRandomIntString(): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  /**
   * Generates a random string of number using the current date
   * @returns string
   */
  generateRandomNumber(): string {
    return Math.floor(Date.now() * Math.random()).toString();
  }

  deleteObjectProperty<T extends object, D extends keyof T>(
    object: T,
    key: D,
  ): Omit<T, D> {
    const allowedKeys = Object.keys(object).filter((k) => k !== key);
    const newObject = {};

    allowedKeys.forEach((k) => {
      newObject[k] = object[k];
    });

    return newObject as Omit<T, D>;
  }

  async asyncRpcWrapper<T>(handler: () => Promise<T>): Promise<T> {
    try {
      return await handler();
    } catch (error: unknown) {
      console.error('RPC Exception:', error);

      if (error instanceof Error) {
        throw new RpcException({
          name: 'RpcException',
          message: error.message,
          stack: error.stack,
        });
      }

      throw new RpcException({
        name: 'RpcException',
        message: 'Something went wrong',
      });
    }
  }

  getPaginationQuery(query: PaginationQueryDto): PaginationQuery {
    const page = query.page || 1;
    const pageSize = query.page_size || 10;
    const offset = (page - 1) * pageSize;

    return { offset, page, pageSize };
  }

  paginateResponse<T>(
    page: number,
    pageSize: number,
    count: number,
    rows: Array<T>,
  ): PaginationData<Array<T>> {
    const totalPages = Math.ceil(count / pageSize);

    return {
      data: rows,
      currentPage: page,
      pageSize: pageSize,
      totalPages,
      totalRecords: count,
    };
  }
}
