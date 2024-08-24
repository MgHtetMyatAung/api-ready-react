import { configureStore } from "@reduxjs/toolkit";
import { apiSlicesArray } from "./api/apiControl";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth/authSlice";
import errorReducer from "./error/errorSlice";
import { removeErrorInfo, setErrorInfo } from "./error/errorSlice";
import persistReducer from "redux-persist/es/persistReducer";
import { persistConfig } from "./persist";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { PERSIST } from "redux-persist";

// Step 2.1: Create an object to hold the reducers
const reducers = { auth: authReducer, error: errorReducer };

// Step 2.2: Create an array to collect the middleware
let middleware = [];

apiSlicesArray.forEach((api) => {
  reducers[api.reducerPath] = api.reducer; // Add reducer dynamically
  middleware.push(api.middleware); // Collect middleware
});

// Create the persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

// error handle
const rtkQueryErrorLogger = () => (next) => (action) => {
  if (action.type.endsWith("rejected")) {
    // console.log(action); // Log the rejected action
    if (action.payload?.status === 401) {
      // console.log(action.payload?.data?.message);
      next(setErrorInfo("global api error"));
    }
  } else if (action.type.endsWith("fulfilled")) {
    // console.log(action); // Log the fulfilled action
    next(removeErrorInfo());
    // next(
    //   addErrorInfo({
    //     code: 401,
    //     message: "token expired",
    //   })
    // );
  }

  return next(action);
};

// Step 2.3: Configure the store dynamically
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware, rtkQueryErrorLogger), // Spread middleware array into concat
  devTools: true,
});

setupListeners(store.dispatch);

export const persister = persistStore(store);
