import { IResponse } from '../models/IResponse';

export const BASE_URL = process.env.REACT_APP_API_URL! as string;

export const processResponse = <T>(
  response: IResponse<T>,
  meta: any,
  arg: unknown
): IResponse<T> => {
  const { request } = meta;
  if (request.url.includes('logout')) {
    localStorage.removeItem('key');
  }
  if (!request.url.includes('profile')) {
    // TODO: Toast notif
  }

  console.log({ response });

  return response;
};

export const processError = (
  error: { status: number; data: IResponse<void> },
  meta: unknown,
  arg: unknown
): { status: number; data: IResponse<void> } => {
  if (
    error.data.code === 401 &&
    error.data.status === 'UNAUTHORIZED' &&
    error.data.message === 'You are not logged in'
  ) {
    // TODO: Finish local storage tokens clear on logout
    localStorage.setItem('', '');
  }
  // TODO: Toast notif

  console.log({ error });
  return error;
};
