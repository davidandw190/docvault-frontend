import { IUser } from './interfaces/IUser';

/**
 * Type representing a user role object.
 * 
 * @type
 */
export type Role = { role: string }

/**
 * Type representing a user wrapper object.
 * 
 * @type
 */
export type User = { user: IUser };

/**
 * Type representing a collection of users.
 * 
 * @type
 */
export type Users = { users: IUser[] };


export type UpdateProfileDetailsRequest = {
  userId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
}

export type UpdateUserPasswordRequest = {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}