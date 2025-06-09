import { apiSlice } from "./apiSlice";
import { CHATBOT_URL } from "../constants";

export const chatBotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postChatBot: builder.mutation({
      query: (question) => ({
        url: `${CHATBOT_URL}`,
        method: "POST",
        body: question,
      }),
    }),
  }),
});

// Export the hook for use in components
export const { usePostChatBotMutation } = chatBotApiSlice;
