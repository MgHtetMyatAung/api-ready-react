// import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { logOut, setCredentials } from "../auth/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_BASE_API_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.originalStatus === 403) {
//     console.log("sending refresh token");
//     // send refresh token to get new access token
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult);
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       // store the new token
//       api.dispatch(setCredentials({ ...refreshResult.data, user }));
//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }

//   return result;
// };

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logOut, setCredentials } from "../auth/authSlice";
import { decryptData } from "../../libs/crypto";
import { authTypes } from "../config";

// Base query 1: Handles refresh token and access token logic
const baseQueryWithReauth =
  ({ baseUrl }) =>
  async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl,
      credentials: "include",
      prepareHeaders: (headers, { getState }) => {
        const token = decryptData(getState().auth.token);
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
      },
    });

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
      // If unauthorized, try to refresh token
      const refreshResult = await baseQuery("/refresh", api, extraOptions);
      if (refreshResult?.data) {
        const user = api.getState().auth.user;
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }

    return result;
  };

// Base query 2: Handles only access token
const baseQueryWithAccessToken = ({ baseUrl }) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = decryptData(getState().auth.token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

// Base query 3: Handles only API key
const baseQueryWithApiKey = ({ baseUrl, apiKey }) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("x-api-key", apiKey);
      return headers;
    },
  });

export const selectBaseQuery = (config) => {
  switch (config.authType) {
    case authTypes.refreshToken:
      return baseQueryWithReauth({ baseUrl: config.baseUrl });
    case authTypes.accessToken:
      return baseQueryWithAccessToken({ baseUrl: config.baseUrl });
    case authTypes.apiKey:
      return baseQueryWithApiKey({
        baseUrl: config.baseUrl,
        apiKey: config.apiKey,
      });
    case authTypes.none:
      return fetchBaseQuery({ baseUrl: config.baseUrl });
    default:
      throw new Error("Unknown auth type");
  }
};
