import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../services/endpoint.config";
import { selectBaseQuery } from "./baseQuery";

// Utility to replace params like :id in URLs
const replaceUrlParams = (url, params) =>
  Object.keys(params).reduce(
    (acc, param) => acc.replace(`:${param}`, params[param]),
    url
  );

const createDynamicApi = (config) => {
  const baseQuery = selectBaseQuery(config);

  return createApi({
    reducerPath: `${config.title}Api`,
    baseQuery: baseQuery,
    tagTypes: config.tagTypes,
    endpoints: (builder) => {
      const endpoints = {};

      config.endpoints.forEach((endpoint) => {
        if (String(endpoint.method).toUpperCase() === "GET") {
          endpoints[endpoint.name] = builder.query({
            query: (params) => replaceUrlParams(endpoint.url, params || {}),
            providesTags: endpoint.providesTags || [],
          });
        } else {
          endpoints[endpoint.name] = builder.mutation({
            query: (data) => ({
              url: replaceUrlParams(endpoint.url, data.params || {}),
              method: endpoint.method,
              body: data.body || undefined,
            }),
            invalidatesTags: endpoint.invalidatesTags || [],
          });
        }
      });

      return endpoints;
    },
  });
};

// Step 3: Generate APIs for each configuration
export const apiSlicesArray = endpoints.map((config) =>
  createDynamicApi(config)
);

export const apiSlices = apiSlicesArray.reduce((acc, apiSlice, index) => {
  const config = endpoints[index];
  acc[`${config.title}Api`] = apiSlice;
  return acc;
}, {});
