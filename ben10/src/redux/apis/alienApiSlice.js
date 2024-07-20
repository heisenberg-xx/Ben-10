import { apiSlice } from "./apiSlice";
import { ALIEN_URL } from "../constants";





export const alineApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAliensByversionId: builder.query({
            query: (version_id) => ({
                url: `${ALIEN_URL}/${version_id}`,
            }),
            providesTags: ['Alien']
        }),
        getAlien: builder.query({
            query: ({ alienname, versionid }) => ({
                url: `${ALIEN_URL}/alienData/${alienname}/${versionid}`,
            }),
            providesTags: ['Alien']
        })

    })

})

export const { useGetAliensByversionIdQuery, useGetAlienQuery } = alineApiSlice
