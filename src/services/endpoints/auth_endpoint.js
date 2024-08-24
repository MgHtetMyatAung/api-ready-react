import { authTypes, baseUrls } from "../predefine.config";

export const auth_endpoint = {
  title: "authentication",
  baseUrl: baseUrls.ecommerce,
  authType: authTypes.refreshToken,
  tagTypes: ["Auth"],
  endpoints: [
    {
      name: "login",
      method: "POST",
      url: "auth/login",
      providesTags: ["Auth"],
    },
    {
      name: "forgotPassword",
      method: "POST",
      url: "auth/forgotPassword",
      providesTags: ["Auth"],
    },
    {
      name: "resetPassword",
      method: "POST",
      url: "auth/resetPassword",
      providesTags: ["Auth"],
    },
    {
      name: "verifyAccount",
      method: "POST",
      url: "auth/verifyAccount",
      providesTags: ["Auth"],
    },
    {
      name: "register",
      method: "POST",
      url: "auth/register",
      providesTags: ["Auth"],
    },
    {
      name: "refresh",
      method: "POST",
      url: "auth/refresh",
      providesTags: ["Auth"],
    },
    {
      name: "logout",
      method: "POST",
      url: "auth/logout",
      providesTags: ["Auth"],
    },
  ],
};
