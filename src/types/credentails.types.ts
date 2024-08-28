import { IUser } from './interfaces/IUser';

/**
 * Type representing a login request payload.
 *
 * @type
 */
export type LoginRequest = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

/**
 * Type representing a registration request payload.
 *
 * @extends {LoginRequest}
 *
 * @type
 */
export interface RegistrationRequest extends LoginRequest {
    firstName: string;
    lastName: string;
    phone?: string;
    bio?: string;
    password: string;
    confirmPassword: string;
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

export type ForgotPasswordRequest = Pick<IUser, 'email'>;

export type ResetPasswordExternallyRequest = {
    userId: string;
    newPassword: string;
    confirmNewPassword: string;
};

export type IUpdatePasswordRequest = {
    userId: string;
    password: string;
    newPassword: string;
    confirmNewPassword: string;
};
