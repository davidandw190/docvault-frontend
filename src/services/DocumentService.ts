import { BASE_URL, isJsonContentType, processError, processResponse } from '../utils/request.utils';

import { IResponse } from '../types/interfaces/IResponse';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Http from '../enums/http.method';
import { DocumentsPage } from '../types/interfaces/IPage';
import { DocumentsQuery } from '../types/document.types';

export const documentAPI = createApi({
    reducerPath: 'documentAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        isJsonContentType
    }),
    tagTypes: ['Documents'],
    endpoints: builder => ({
        searchDocuments: builder.query<IResponse<DocumentsPage>, DocumentsQuery>({
            query: searchQuery => ({
                url: `/search?page=${searchQuery.page}&size=${searchQuery.size}&name=${searchQuery.name}`,
                method: Http.GET
            }),
            keepUnusedDataFor: 120,
            transformResponse: processResponse<DocumentsPage>,
            transformErrorResponse: processError,
            providesTags: () => ['Documents']
        })
    })
});
