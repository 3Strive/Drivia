import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export const UserControllerDocs = (): ClassDecorator =>
  applyDecorators(ApiBearerAuth('access-token'), ApiTags('users'));

// ----------------------------------
// Get User By ID
// ----------------------------------
export const GetUserByIdDoc = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Get User by ID' }),

    ApiParam({
      name: 'id',
      required: true,
      type: String,
      example: '597680a2-830d-448b-bbaf-131bfdc2477d',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'User retrieved successfully',

      schema: {
        example: {
          data: {
            id: '597680a2-830d-448b-bbaf-131bfdc2477d',
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@example.com',
            phone: '08000000001',
            password:
              '$2b$10$PxWFzFmavW0D7GxC6.O3DuFY4LDD/.51V4MDgxBRJehocj2sCdOfi',
            roleId: '4624a202-c7a0-40cf-a118-89227e4b12e2',
            organisationId: '00000000-0000-0000-0000-000000000001',
            createdAt: '2026-03-12T12:18:15.382Z',
            updatedAt: '2026-03-12T12:18:15.382Z',
            deletedAt: null,

            roles: {
              id: '4624a202-c7a0-40cf-a118-89227e4b12e2',
              organizationId: '00000000-0000-0000-0000-000000000001',
              code: 'SUPER_ADMIN',
              name: 'SUPER_ADMIN',
              description: 'Super Admin Role',
              createdAt: '2026-03-12T12:18:15.044Z',
              updatedAt: '2026-03-12T12:18:15.044Z',
              deletedAt: null,

              rolePermissions: [
                {
                  id: '049e33cf-39ec-4514-a500-9dc0c1a25473',
                  roleId: '4624a202-c7a0-40cf-a118-89227e4b12e2',
                  permissionId: 'b4018706-e7ad-4570-9c5e-23be6bc2791f',
                  allowed: true,
                  createdAt: '2026-03-12T12:18:15.067Z',
                  updatedAt: '2026-03-12T12:18:15.067Z',
                  deletedAt: null,

                  permission: {
                    id: 'b4018706-e7ad-4570-9c5e-23be6bc2791f',
                    name: 'CREATE_USER',
                    description: 'Create users',
                    createdAt: '2026-03-12T12:18:15.026Z',
                    updatedAt: '2026-03-12T12:18:15.026Z',
                    deletedAt: null,
                  },
                },
              ],
            },
          },

          status: 200,
          message: 'User retrieved successfully',
        },
      },
    }),
  );

// ----------------------------------
// Get All Users
// ----------------------------------
export const GetAllUsersDoc = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Get All Users' }),

    ApiQuery({
      name: 'search',
      required: false,
      type: String,
      example: 'john',
    }),

    ApiQuery({
      name: 'roleId',
      required: false,
      type: String,
      example: '4624a202-c7a0-40cf-a118-89227e4b12e2',
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Users retrieved successfully',

      schema: {
        example: {
          data: [
            {
              id: '597680a2-830d-448b-bbaf-131bfdc2477d',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
            },
          ],

          total: 1,
          page: 1,
          limit: 10,
          status: 200,
          message: 'Users retrieved successfully',
        },
      },
    }),
  );

// ----------------------------------
// Create User
// ----------------------------------
export const CreateUserDoc = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Create User' }),

    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User created successfully',

      schema: {
        example: {
          data: {
            id: '597680a2-830d-448b-bbaf-131bfdc2477d',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },

          status: 201,
          message: 'User created successfully',
        },
      },
    }),
  );

// ----------------------------------
// Update User
// ----------------------------------
export const UpdateUserDoc = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Update User' }),

    ApiParam({
      name: 'id',
      required: true,
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'User updated successfully',

      schema: {
        example: {
          data: {
            id: '597680a2-830d-448b-bbaf-131bfdc2477d',
            firstName: 'Updated',
            lastName: 'User',
            email: 'updated@example.com',
          },

          status: 200,
          message: 'User updated successfully',
        },
      },
    }),
  );

// ----------------------------------
// Change Password
// ----------------------------------
export const ChangePasswordDoc = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Change User Password' }),

    ApiParam({
      name: 'id',
      required: true,
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'Password changed successfully',

      schema: {
        example: {
          status: 200,
          message: 'Password changed successfully',
        },
      },
    }),
  );

// ----------------------------------
// Delete User
// ----------------------------------
export const DeleteUserDoc = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Delete User by ID' }),

    ApiParam({
      name: 'id',
      required: true,
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'User deleted successfully',

      schema: {
        example: {
          data: {
            id: '597680a2-830d-448b-bbaf-131bfdc2477d',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },

          status: 200,
          message: 'User deleted successfully',
        },
      },
    }),
  );

// ----------------------------------
// Reassign User Role
// ----------------------------------
export const ReassignUserRoleDoc = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: 'Reassign User Role',
    }),

    ApiParam({
      name: 'userId',
      required: true,
      type: String,
    }),

    ApiParam({
      name: 'newRoleId',
      required: true,
      type: String,
    }),

    ApiResponse({
      status: HttpStatus.OK,
      description: 'User reassigned successfully',

      schema: {
        example: {
          status: 200,
          message: 'User reassigned successfully',
        },
      },
    }),
  );
