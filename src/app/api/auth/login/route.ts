import { IUser, User } from "@/backend/models/User";
import { APIError, tryCatch } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  return tryCatch(async () => {
    const requiredFields: (keyof IUser)[] = ["email", "password"];
    const missingFields: string[] = [];

    const body: IUser = await request.json();
    const { email, password } = body;

    requiredFields.forEach((field) => {
      if (!body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throw new APIError(`Missing fields: [${missingFields.join(", ")}]`, 400);
    }

    const user = await User.findByCredentials(email, password);

    if (!user) {
      throw new APIError("Invalid email or password", 401);
    }

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        user,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "none",
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  });
};
