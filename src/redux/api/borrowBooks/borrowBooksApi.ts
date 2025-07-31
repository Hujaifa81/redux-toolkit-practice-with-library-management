import type {  IBorrowBookObj, IBorrowBookResponse } from "@/interfaces/borrowBooks/borrowBooks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowBooksApi = createApi({
  reducerPath: 'borrowBooksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-system-neon-iota.vercel.app/' }),
  tagTypes: ['borrow', 'books'],
  endpoints: (builder) => ({
    getBorrowBooksSummary: builder.query<IBorrowBookResponse, void>({
      query: () => ({
        url: 'api/borrow',
      }),
      providesTags: ['borrow'],
    }),
    addBorrowBook: builder.mutation<IBorrowBookResponse, IBorrowBookObj>({
      query: (newBorrowBook) => ({
        url: 'api/borrow',
        method: 'POST',
        body: newBorrowBook,
      }),
      invalidatesTags: ['borrow', 'books'],
    }),

  }),
})

export const { useAddBorrowBookMutation,useGetBorrowBooksSummaryQuery } = borrowBooksApi;
