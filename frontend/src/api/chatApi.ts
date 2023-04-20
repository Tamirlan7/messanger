import { IMessage } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";


export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env['API_HOST_NAME']}/api/v1/chat`, credentials: 'include', headers: {
        'X-CSRFToken': Cookies.get('csrftoken') as string
    }}),
    endpoints: (build) => ({
        getMessages: build.query<IMessage[], number | string>({
            query: (recipientId) => `/message/${recipientId}`
        })
    })
})

export const { useLazyGetMessagesQuery } = chatApi
