import { IUser } from './IUser';

export interface ILoginRequest {
  email: string;
  password: string;
  confirmPassword?: string;
}

export type QrCodeRequest = Pick<IUser, 'userId'> & {
  qrCode?: string;
  qrCode1: string;
  qrCode2: string;
  qrCode3: string;
  qrCode4: string;
  qrCode5: string;
  qrCode6: string;
};
