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
