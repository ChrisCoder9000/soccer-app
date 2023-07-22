import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slices/main";

const store = configureStore({
  reducer: {
    mainSlice: mainReducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["mainSlice/signup/fulfilled"],
        ignoredActionPaths: ["payload"],
      },
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
