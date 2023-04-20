import { ILogin } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${process.env['API_HOST_NAME']}/api/v1/account`, 
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken') as string
        }, 
        credentials: 'include'
     }),
    endpoints: (build) => ({
        login: build.mutation<null, ILogin>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            })
        }),
        register: build.mutation<null, ILogin>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            })
        }),
        logout: build.mutation({
            query: () => ({
                method: 'POST',
                url: `/logout`
            })
        }),
        checkAuthenticated: build.query({
            query: () => `is-authenticated`,
            keepUnusedDataFor: 0
        })        
    })    
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useCheckAuthenticatedQuery, useLazyCheckAuthenticatedQuery } = authApi
