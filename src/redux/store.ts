import { configureStore } from '@reduxjs/toolkit'
import { booksApi } from './api/books/booksApi';
import { borrowBooksApi } from './api/borrowBooks/borrowBooksApi';

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [borrowBooksApi.reducerPath]: borrowBooksApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(booksApi.middleware, borrowBooksApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;