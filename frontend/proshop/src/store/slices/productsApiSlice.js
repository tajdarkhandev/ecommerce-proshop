import { PRODUCTS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: () => ({
          url: PRODUCTS_URL,
        }),
        keepUnusedDataFor: 5,
        transformResponse: function (data) {
          return data?.products;
        },
      }),
      getProductDetails: builder.query({
        query: (productId) => ({
          url: `${PRODUCTS_URL}/${productId}`,
        }),
        keepUnusedDataFor: 5,
        transformResponse: function (data) {
          return data?.product;
        },
      }),
    };
  },
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
