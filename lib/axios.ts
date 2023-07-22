import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

export const client = axios.create({
  baseURL: "/api",
  jar: new CookieJar(),
  withCredentials: true,
});
