/**
 * Interface representing a user object.
 * 
 * @interface
 */
export interface IUser {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  qrCodeImageUri?: string;
  imageUrl: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  lastLogin: string | number | Date;
  enabled: boolean;
  mfa: boolean;
  createdAt: string;
  updateAt: string;
  createdBy: number;
  updatedBy: number;
  role: string;
  authorities: string;
}

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


export interface IUpdateProfileDetailsRequest {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
}