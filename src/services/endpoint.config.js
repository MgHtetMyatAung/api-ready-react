import { auth_endpoint } from "./endpoints/auth_endpoint";
import { currency_endpoint } from "./endpoints/currency_endpoint";
import { product_endpoint } from "./endpoints/product_endpoint";
import { user_endpoint } from "./endpoints/user_endpoint";

export const endpoints = [
  auth_endpoint,
  product_endpoint,
  user_endpoint,
  currency_endpoint,
];
