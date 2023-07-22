import { createSlice } from "@reduxjs/toolkit";
import { IAuthenticatedUser } from "../../../types/store";
import { login, signup, verifyToken } from "../thunks/main";

interface MainState {
  isLoading: boolean;
  authenticatedUser: IAuthenticatedUser | null;
}

const initialState: MainState = {
  isLoading: false,
  authenticatedUser: null,
};

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(verifyToken.rejected, (state) => {
      state.authenticatedUser = null;
      state.isLoading = false;
    });
    builder.addCase(verifyToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(signup.rejected, (state) => {
      state.authenticatedUser = null;
      state.isLoading = false;
    });
    builder.addCase(signup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.authenticatedUser = null;
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default mainSlice.reducer;
export const { setIsLoading } = mainSlice.actions;
