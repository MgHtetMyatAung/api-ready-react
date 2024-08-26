import { authTypes, baseUrls } from "../../app/config";

export const user_endpoint = {
  title: "user",
  baseUrl: baseUrls.ecommerce,
  authType: authTypes.refreshToken,
  tagTypes: ["User"],
  endpoints: [
    {
      name: "getUsers",
      method: "GET",
      url: "users",
      providesTags: ["User"],
    },
    {
      name: "getUser",
      method: "GET",
      url: "users/:id",
      providesTags: ["User"],
    },
    {
      name: "createUser",
      method: "POST",
      url: "users",
      invalidatesTags: ["User"],
    },
    {
      name: "updateUser",
      method: "PUT",
      url: "users/:id",
      invalidatesTags: ["User"],
    },
    {
      name: "deleteUser",
      method: "DELETE",
      url: "users/:id",
      invalidatesTags: ["User"],
    },
  ],
};
