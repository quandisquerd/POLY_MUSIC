import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { pause } from '../util/pause'


const musicApi = createApi({
    reducerPath: 'music',
    tagTypes: ['Music'],
    baseQuery: fetchBaseQuery({
        baseUrl: `https://81e0-2402-800-61ce-4ac7-9c40-834-308f-7a27.ngrok-free.app`,
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