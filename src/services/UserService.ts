import {
  BASE_URL,
  isJsonContentType,
  processError,
  processResponse,
} from '../utils/request.utils';

import { IResponse } from '../models/IResponse';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/IUser';
import { ILoginRequest, QrCodeRequest } from '../models/ICredentails';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    isJsonContentType,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    fetchUser: builder.query<IResponse<User>, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
      keepUnusedDataFor: 120,
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      providesTags: () => ['User'],
    }),
    loginUser: builder.mutation<IResponse<User>, ILoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
    }),
    verifyMfaQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
      query: (qrCodeRequest) => ({
          url: '/verify/qrcode',
          method: 'POST',
          body: qrCodeRequest
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => error ? [] : ['User']
  }),
  }),
});
