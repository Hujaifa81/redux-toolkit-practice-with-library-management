import type { IBook, IBookResponse } from '@/interfaces/books/books'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-system-neon-iota.vercel.app/' }),
  tagTypes: ['books'],
  endpoints: (builder) => ({
    getAllBooks: builder.query<IBookResponse, { filter?: string; sortBy?: string; sort?: string; limit?: number }>({
      query: ({ filter, sortBy, sort, limit }) => {
        const params: Record<string, string | number> = {}
        if (filter) params.filter = filter
        if (sortBy) params.sortBy = sortBy
        if (sort) params.sort = sort
        if (limit) params.limit = limit
        return {
          url: 'api/books',
          params,
        }
      },
      providesTags: ['books'],
    }),

    addBook: builder.mutation<IBookResponse, Omit<IBook,'createdAt' | 'updatedAt' | '_id'>>({
      query: (newBook) => ({
        url: 'api/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['books'],
    }),

    updateBook: builder.mutation<IBookResponse, Omit<IBook,'createdAt' | 'updatedAt'>>({
      query: (updatedBook) => ({
        url: `api/books/${updatedBook._id}`,
        method: 'PUT',
        body: updatedBook,
      }),
      invalidatesTags: ['books'],
    }),

    deleteBook: builder.mutation<IBookResponse, string>({
      query: (id) => ({
        url: `api/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  })
})

export const { useGetAllBooksQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation } = booksApi
