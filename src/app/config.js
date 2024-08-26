// for auth types
export const authTypes = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  apiKey: "apiKey",
  none: "none",
};

// for different environment baseUrl
export const baseUrls = {
  ecommerce: "https://free-commerce-api.vercel.app/api",
  coin: import.meta.env.VITE_APP_COINLAYER_URL,
};
