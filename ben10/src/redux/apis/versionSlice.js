import { apiSlice } from "./apiSlice";
import { VERSION_URL } from "../constants";
import { createSlice } from "@reduxjs/toolkit";

export const versionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVersions: builder.query({
      query: () => ({
        url: VERSION_URL,
      }),
      providesTags: ["Version"],
    }),
    getVersion: builder.query({
      query: (name) => ({
        url: `${VERSION_URL}/${name}`,
      }),
      providesTags: ["Version"],
    }),
  }),
});
const storedVersion = localStorage.getItem("version")
  ? JSON.parse(localStorage.getItem("version"))
  : null;

const versionReducerSlice = createSlice({
  name: "version",
  initialState: storedVersion,
  reducers: {
    setVersion: (state, action) => {
      const selectedVersion = action.payload;
      localStorage.setItem("version", JSON.stringify(selectedVersion));
      return selectedVersion;
    },
    clearVersion: () => {
      localStorage.removeItem("version");
      return null;
    },
  },
});

export const { setVersion, clearVersion } = versionReducerSlice.actions;

export default versionReducerSlice.reducer;

export const { useGetAllVersionsQuery, useGetVersionQuery } = versionSlice;
