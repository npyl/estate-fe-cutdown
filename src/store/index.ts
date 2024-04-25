import type { Action } from "@reduxjs/toolkit";
import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import type { ThunkAction } from "redux-thunk";
import { rtkQueryErrorLogger } from "../services/error";
import { rootReducer } from "./root-reducer";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [],
          ignoredActionPaths: ["payload", "meta"],
        },
      }).concat(rtkQueryErrorLogger),
    ...options,
  });
export const store = createStore();

export const { dispatch } = store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();
