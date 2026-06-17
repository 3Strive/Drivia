import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PaginationQueryDto } from './pagination.dto';
import { GenericResponseDto } from './generic-response.dto';

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

const CARTYPES = [
  'brandNew',
  'tokunbo',
  'nigerianUsed',
  'suvs',
  'saloon',
  'trucks',
  'luxury',
  'budget',
] as const;

const PLATFORMS = ['whatsApp', 'facebook', 'instagram', 'twitter'] as const;

const PLAN = ['free', 'pro', 'vvip'] as const;

export class CreateUser {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Account password (minimum 6 characters)',
    example: 'StrongP@ss1',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+2348012345678',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiPropertyOptional({
    description: 'Physical address of the business',
    example: '12 Allen Avenue, Ikeja, Lagos',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Name of the business',
    example: 'Mumin Autos',
  })
  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @ApiPropertyOptional({
    description: 'Description of the business',
    example: 'We sell and import quality used cars from Europe and the US.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Types of cars the business deals in',
    enum: CARTYPES,
    isArray: true,
    example: [CARTYPES[0], CARTYPES[1]],
  })
  @IsOptional()
  @IsArray()
  carTypes?: (typeof CARTYPES)[number][];

  @ApiPropertyOptional({
    description: 'Estimated monthly stock volume',
    example: '10-20',
  })
  @IsOptional()
  @IsString()
  monthlyStock?: string;

  @ApiPropertyOptional({
    description: 'Platforms the business currently sells on',
    enum: PLATFORMS,
    isArray: true,
    example: [PLATFORMS[0]],
  })
  @IsOptional()
  @IsArray()
  @IsIn(PLATFORMS, { each: true })
  platforms?: (typeof PLATFORMS)[number][];

  @ApiPropertyOptional({
    description: 'Selected subscription plan',
    enum: PLAN,
    example: PLAN[0],
  })
  @IsOptional()
  @IsIn(PLAN)
  plan?: (typeof PLAN)[number];
}
export class GenericUserResp extends GenericResponseDto<CreateUser> {}

export class GetUsersDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
