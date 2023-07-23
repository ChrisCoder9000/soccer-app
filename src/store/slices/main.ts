import { createSlice } from "@reduxjs/toolkit";
import { IAuthenticatedUser } from "../../../types/store";
import {
  findUsers,
  getUsers,
  login,
  logout,
  signup,
  updateProfile,
  verifyToken,
} from "../thunks/main";
import { IUser } from "@/backend/models/User";

interface MainState {
  isLoading: boolean;
  authenticatedUser: IAuthenticatedUser | null;
  users: IUser[];
}

const initialState: MainState = {
  isLoading: false,
  authenticatedUser: null,
  users: [],
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
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticatedUser = null;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.authenticatedUser = null;
      state.isLoading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.authenticatedUser = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(findUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
    });
    builder.addCase(findUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(findUsers.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default mainSlice.reducer;
export const { setIsLoading } = mainSlice.actions;
