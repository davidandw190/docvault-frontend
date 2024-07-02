import { IUser } from './IUser';

/**
 * Interface representing a login request payload.
 * 
 * @interface
 */
export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Interface representing a registration request payload.
 * 
 * @extends {ILoginRequest}
 * 
 * @interface
 */
export interface IRegistrationRequest extends ILoginRequest {
  firstName: string;
  lastName: string;
  phone?: string;
  bio?: string;
  confirmPassword?: string;
}

/**
 * Type representing the QR code request for MFA.
 * 
 * @type
 */
export type QrCodeRequest = Pick<IUser, 'userId'> & {
  qrCode?: string;
  qrCode1: string;
  qrCode2: string;
  qrCode3: string;
  qrCode4: string;
  qrCode5: string;
  qrCode6: string;
};
