import { BASE_URL, isJsonContentType, processError, processResponse } from "../utils/request.utils";

import { IResponse } from "../models/IResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { User } from "../models/IUser";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include", isJsonContentType  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUser: builder.query<IResponse<User>, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      keepUnusedDataFor: 120,
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      providesTags: (result, error) => ["User"],

    })
  }),
})