import { User } from "@/backend/models/User";
import { APIError, tryCatch } from "@/utils/api";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return tryCatch(async () => {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new APIError("Missing token", 401);
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as jwt.JwtPayload;

      if (!decodedToken) {
        throw new APIError("Invalid token", 401);
      }

      const user = await User.findOneBy("email", decodedToken.email);

      return NextResponse.json({ user });
    } catch (error) {
      console.log(error);
      throw new APIError("Error verifying token", 401);
    }
  });
};
