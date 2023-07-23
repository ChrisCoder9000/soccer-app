import { User } from "@/backend/models/User";
import { APIError, tryCatch } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  return tryCatch(async () => {
    const userId = request.nextUrl.searchParams.get("uid");
    const data = await request.json();

    if (!userId) {
      throw new APIError("Missing user id", 400);
    }

    const updatedUser = await User.findByIdAndUpdate(+userId, data);

    const response = NextResponse.json(
      {
        message: "User updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );

    return response;
  });
};
