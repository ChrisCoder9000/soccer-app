import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../../lib/axios";
import { userTypes } from "../../../types/general";

export const verifyToken = createAsyncThunk(
  "mainSlice/verifyToken",
  async () => {
    try {
      const response = await client.get("/auth/verify");

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export interface ISignupData {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  type: userTypes;
}

export const signup = createAsyncThunk(
  "mainSlice/signup",
  async (data: ISignupData) => {
    try {
      const response = await client.post("/auth/signup", data);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const login = createAsyncThunk(
  "mainSlice/login",
  async (data: { email: string; password: string }) => {
    try {
      const response = await client.post("/auth/login", data);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const logout = createAsyncThunk("mainSlice/logout", async () => {
  try {
    const response = await client.get("/auth/logout");

    return response.data;
  } catch (error) {
    return error;
  }
});

interface IUpdateProfile {
  uid: string;
  data: object;
}

export const updateProfile = createAsyncThunk(
  "mainSlice/updateProfile",
  async ({ uid, data }: IUpdateProfile) => {
    try {
      const response = await client.patch(`/users/update?uid=${uid}`, data);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getUsers = createAsyncThunk("mainSlice/getUsers", async () => {
  try {
    const response = await client.get("/users");

    return response.data;
  } catch (error) {
    return error;
  }
});

export const findUsers = createAsyncThunk(
  "mainSlice/findUsers",
  async ({ query, value }: { query: string; value: string }) => {
    try {
      const response = await client.get(`/users?${query}=${value}`);

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
