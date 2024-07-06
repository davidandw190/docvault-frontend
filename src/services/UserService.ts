import {
  BASE_URL,
  isJsonContentType,
  processError,
  processResponse,
} from '../utils/request.utils';

import { IResponse } from '../models/IResponse';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../models/IUser';
import {
  ForgotPasswordRequest,
  ILoginRequest,
  IRegistrationRequest,
  QrCodeRequest,
} from '../models/ICredentails';
import Http from '../enums/http.method';

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
        method: Http.GET,
      }),
      keepUnusedDataFor: 120,
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      providesTags: () => ['User'],
    }),
    loginUser: builder.mutation<IResponse<User>, ILoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: Http.POST,
        body: credentials,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
    }),
    registerUser: builder.mutation<IResponse<void>, IRegistrationRequest>({
      query: (registrationRequest) => ({
        url: '/register',
        method: Http.POST,
        body: registrationRequest,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
    }),
    logoutUser: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: '/logout',
        method: Http.POST,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    verifyAccount: builder.mutation<IResponse<void>, string>({
      query: (key) => ({
        url: `/verify/account?key=${key}`,
        method: Http.PATCH,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
    }),
    verifyMfaQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
      query: (qrCode) => ({
        url: '/verify/qrcode',
        method: Http.PATCH,
        body: qrCode,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    forgotPassword: builder.mutation<IResponse<void>, ForgotPasswordRequest>({
      query: (forgotPasswordRequest) => ({
        url: '/forgot-password',
        method: Http.POST,
        body: forgotPasswordRequest,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
  }),
});
