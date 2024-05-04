import { connectMongoDB } from "@/lib/dbConnect";
import Player from "@/models/Player";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST(req: any, res: any) {
  await connectMongoDB();

  const response = NextResponse.json({ success: true }, { status: 200 });

  const jwt = cookies().get("PLAYER_TOKEN");
  if (!jwt) {
    return NextResponse.json(
      { message: "Bro, you are already not logged in..." },
      { status: 400 }
    );
  } else {
    response.cookies.delete("PLAYER_TOKEN");
    return response;
  }
}
