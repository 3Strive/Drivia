import { Request } from 'express';
import { User } from '@drivia/db';

export type TUser = Pick<User, 'id' | 'email' | 'phoneNumber'>;

export interface TRequest extends Request {
  user: TUser;
}
