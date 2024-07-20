import { apiSlice } from "./apiSlice";
import { VERSION_URL } from "../constants";
import { createSlice } from "@reduxjs/toolkit";




export const versionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllVersions: builder.query({
            query: () => ({
                url: VERSION_URL,
            }),
            providesTags: ['Version']
        }),
        getVersion: builder.query({
            query: (name) => ({
                url: `${VERSION_URL}/${name}`,
            }),
            providesTags: ['Version']
        }),


    })

})

const versionReducerSlice = createSlice({
    name: 'version',
    initialState: null,
    reducers: {
        setVersion: (state, action) => action.payload,
    },
});

export const { setVersion } = versionReducerSlice.actions;

export default versionReducerSlice.reducer;

export const { useGetAllVersionsQuery, useGetVersionQuery } = versionSlice
