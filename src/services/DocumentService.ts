import { DocumentsPage } from '../models/IPage';
import { DocumentsQuery } from '../models/IDocument';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import {
  BASE_URL,
  isJsonContentType,
  processResponse,
} from '../utils/request.utils';
import { IResponse } from '../models/IResponse';
import Http from '../enums/http.method';
import { processError } from '../utils/request.utils';

export const documentAPI = createApi({
  reducerPath: 'documentAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    isJsonContentType,
  }),
  tagTypes: ['Documents'],
  endpoints: (builder) => ({
    queryDocuments: builder.query<IResponse<DocumentsPage>, DocumentsQuery>({
      query: (searchQuery) => ({
        url: `/documents/search?page=${searchQuery.page}&size=${searchQuery.size}&name=${searchQuery.name}`,
        method: Http.GET,
        params: searchQuery,
      }),
      keepUnusedDataFor: 120,
      transformResponse: processResponse<DocumentsPage>,
      transformErrorResponse: processError,
      providesTags: () => ['Documents'],
    }),
  }),
});
