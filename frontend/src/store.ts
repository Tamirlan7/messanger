import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@/api/authApi'
import { userApi } from '@/api/userApi'
import { chatApi } from './api/chatApi'
import userSlice from './slices/userSlice'


export const store = configureStore({
    reducer: {
        'user': userSlice,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(chatApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
