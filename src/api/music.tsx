import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'


const musicApi = createApi({
    reducerPath: 'music',
    tagTypes: ['Music'],
    baseQuery: fetchBaseQuery({
        baseUrl: `https://localhots:3000`,
        fetchFn: async (...args) => {
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints: (builder) => ({
        getMusic: builder.query({
            query: () => `/musics`,
            providesTags: ['Music']
        }),
        getOneMusic: builder.query({
            query: (id) => `/musics/${id}`,
            providesTags: ['Music']
        }),
        removeMusic: builder.mutation({
            query: (id) => ({
                url: `/musics/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Music']
        }),
        addMusic: builder.mutation({
            query: (music) => ({
                url: `/musics`,
                method: "POST",
                body: music
            }),
            invalidatesTags: ['Music']
        }),
        updateMusic: builder.mutation({
            query: (music) => ({
                url: `/musics/${music.id}`,
                method: "PATCH",
                body: music
            }),
            invalidatesTags: ['Music']
        })
    })
})


export const { useGetMusicQuery, useGetOneMusicQuery, useAddMusicMutation, useUpdateMusicMutation, useRemoveMusicMutation } = musicApi
export default musicApi
