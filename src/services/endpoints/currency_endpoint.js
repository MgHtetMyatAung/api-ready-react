import { authTypes, baseUrls } from "../../app/config";


export const currency_endpoint = {
  title: "currency",
  baseUrl: baseUrls.coin,
  authType: authTypes.none,
  tagTypes: ["Currrency"],
  endpoints: [
    {
      name: "getCurrencies",
      method: "GET",
      url: "/list?access_key=:access_key",
      providesTags: ["Product"],
    },
    {
      name: "getProduct",
      method: "GET",
      url: "products/:id",
      providesTags: ["Product"],
    },
    {
      name: "createProduct",
      method: "POST",
      url: "products",
      invalidatesTags: ["Product"],
    },
    {
      name: "updateProduct",
      method: "PUT",
      url: "products/:id",
      invalidatesTags: ["Product"],
    },
    {
      name: "deleteProduct",
      method: "DELETE",
      url: "products/:id",
      invalidatesTags: ["Product"],
    },
  ],
};
