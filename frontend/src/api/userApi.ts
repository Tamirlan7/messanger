import { IUser } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env['API_HOST_NAME']}/api/v1/account`, credentials: 'include', headers: {
        'X-CSRFToken': Cookies.get('csrftoken') as string,
    }}),
    tagTypes: ['Friends'],
    endpoints: (build) => ({
        getUser: build.query<IUser, null>({
            query: () => `/user`,
            providesTags: (res) => res ?
            [...res.friends.map(({ id }) => ({ type: 'Friends' as const, id }))]
            : [{type: 'Friends', id: 'LIST'}]
        }),
        addFriend: build.mutation<null, {id: number} | {username: string}>({
            query: (body) => ({
                url: '/friend',
                method: 'POST',
                body: body
            }),
            invalidatesTags: [{type: 'Friends', id: 'LIST'}]
        })
    })
})


export const { useGetUserQuery, useLazyGetUserQuery, useAddFriendMutation } = userApi
