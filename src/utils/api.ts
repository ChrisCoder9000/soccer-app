import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/constants/ErrorCodes";

export const tryCatch = async (fn: Function) => {
  try {
    const res = await fn();
    return res;
  } catch (error) {
    console.error(error);
    let status = (error as APIError).status || 500;
    let errorMessage =
      (error as Error).message || "Internal unknown server error";

    if (errorMessage.includes("11001") && errorMessage.includes("username")) {
      errorMessage = ErrorCodes.usernameAlreadyExists.message;

      return NextResponse.json(
        { error: true, message: `${errorMessage}` },
        { status: 400 }
      );
    }
    if (errorMessage.includes("11002") && errorMessage.includes("email")) {
      errorMessage = ErrorCodes.emailAlreadyExists.message;

      return NextResponse.json(
        { error: true, message: `${errorMessage}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: true, message: `${errorMessage}` },
      { status: status }
    );
  }
};

export class APIError extends Error {
  constructor(message: string, public status: number) {
    super(message);

    this.status = status;
  }
}
