import { IUser, User } from "@/backend/models/User";
import { tryCatch } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  return tryCatch(async () => {
    const searchParams = request.nextUrl.searchParams;

    let response;

    if (Array.from(searchParams.keys()).length) {
      const searchKey = searchParams.keys().next().value as keyof IUser;
      const searchValue = searchParams.get(searchKey);

      const users = (await User.findManyBy(searchKey, searchValue)) ?? [];

      response = NextResponse.json(
        {
          message: "Users fetched successfully",
          count: users.length,
          users,
        },
        { status: 200 }
      );
    } else {
      const users = await User.getAll();

      response = NextResponse.json(
        {
          message: "Users fetched successfully",
          count: users.length,
          users,
        },
        { status: 200 }
      );
    }

    return response;
  });
};
