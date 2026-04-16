import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  page_size?: number;
}

export class PaginationData<T> {
  data: T;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export class PaginationQuery {
  offset: number;
  page: number;
  pageSize: number;
}
