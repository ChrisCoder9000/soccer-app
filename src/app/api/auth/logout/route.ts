import { tryCatch } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return tryCatch(async () => {
    const response = NextResponse.json(
      { message: "Logout succesfully" },
      { status: 200 }
    );
    response.cookies.set({
      name: "token",
      value: "",
      maxAge: 0,
      sameSite: "none",
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return response;
  });
};
