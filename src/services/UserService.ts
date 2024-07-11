import {
  BASE_URL,
  isJsonContentType,
  processError,
  processResponse,
} from '../utils/request.utils';

import { IResponse } from '../models/IResponse';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IUpdateProfileDetailsRequest,
  IUpdateUserPasswordRequest,
  User,
} from '../models/IUser';
import {
  ForgotPasswordRequest,
  ILoginRequest,
  IRegistrationRequest,
  IResetPasswordExternallyRequest,
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
    verifyResetPassword: builder.mutation<IResponse<User>, string>({
      query: (key) => ({
        url: `/verify/reset-password?key=${key}`,
        method: Http.PATCH,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    resetPasswordExternally: builder.mutation<
      IResponse<void>,
      IResetPasswordExternallyRequest
    >({
      query: (resetPasswordRequest) => ({
        url: '/reset-password',
        method: Http.PATCH,
        body: resetPasswordRequest,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    updateProfilePicture: builder.mutation<IResponse<string>, FormData>({
      query: (formData) => ({
        url: '/profile/picture',
        method: Http.PATCH,
        body: formData,
      }),
      transformResponse: processResponse<string>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    updateUserDetails: builder.mutation<
      IResponse<User>,
      IUpdateProfileDetailsRequest
    >({
      query: (details) => ({
        url: '/profile/update/details',
        method: Http.PATCH,
        body: details,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    updateUserPassword: builder.mutation<
      IResponse<void>,
      IUpdateUserPasswordRequest
    >({
      query: (password) => ({
        url: '/profile/update/password',
        method: Http.PATCH,
        body: password,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    toggleAccountExpired: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: '/profile/account-expired',
        method: Http.PATCH,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    toggleAccountLocked: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: '/profile/locked',
        method: Http.PATCH,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    toggleAccountEnabled: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: '/profile/enabled',
        method: Http.PATCH,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    toggleAccountCredentialsExpired: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: '/profile/credentials-expired',
        method: Http.PATCH,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    enableMfa: builder.mutation<IResponse<User>, void>({
      query: () => ({
        url: `/mfa/enable`,
        method: Http.PATCH,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
    disableMfa: builder.mutation<IResponse<User>, void>({
      query: () => ({
        url: `/mfa/disable`,
        method: Http.PATCH,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (_, error) => (error ? [] : ['User']),
    }),
  }),
});
