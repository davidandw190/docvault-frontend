import { CacheKey } from '../enums/cache.key';
import { IResponse } from '../models/IResponse';

export const BASE_URL = process.env.REACT_APP_API_URL! as string;

export const isJsonContentType = (headers: Headers): boolean => {
  const contentType = headers.get('Content-Type');
  return contentType ? [
    'application/vnd.api+json',
    'application/json',
    'application/vnd.hal+json',
    'application/pdf',
    'multipart/form-data',
  ].includes(contentType.trimEnd()) : false;
};

export const processResponse = <T>(
  response: IResponse<T>,
  meta: any,
  arg: unknown
): IResponse<T> => {
  const { request } = meta;
  if (request.url.includes('logout')) {
    localStorage.removeItem(CacheKey.LOGGED_IN);
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
    localStorage.setItem(CacheKey.LOGGED_IN, 'false');
  }
  // TODO: Toast notif

  console.log({ error });
  return error;
};
