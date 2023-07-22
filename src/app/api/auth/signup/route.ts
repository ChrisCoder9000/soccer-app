import { IUser, User } from "@/backend/models/User";
import { APIError, tryCatch } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  return tryCatch(async () => {
    const requiredFields: (keyof IUser)[] = [
      "email",
      "password",
      "passwordRepeat",
      "username",
      "type",
    ];
    const missingFields: string[] = [];

    const body: IUser = await request.json();
    const { email, password, passwordRepeat, username, type } = body;

    requiredFields.forEach((field) => {
      if (!body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throw new APIError(`Missing fields: [${missingFields.join(", ")}]`, 400);
    }

    const newUserData = new User({
      email,
      password,
      passwordRepeat: passwordRepeat!,
      username,
      type,
    });
    const newUser = await newUserData.save();

    const payload = {
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
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
