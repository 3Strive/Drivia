import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from './pagination.dto';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  gender?: 'Male' | 'Female';

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export class GetUsersDto extends PaginationQueryDto {
  search?: string;
}
