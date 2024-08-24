import { authTypes, baseUrls } from "../predefine.config";

export const product_endpoint = {
  title: "product",
  baseUrl: baseUrls.ecommerce,
  authType: authTypes.none,
  tagTypes: ["Product"],
  endpoints: [
    {
      name: "getProducts",
      method: "GET",
      url: "/products?categoryId=:categoryId",
      providesTags: ["Product"],
    },
    {
      name: "getProduct",
      method: "GET",
      url: "/products/:id",
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
