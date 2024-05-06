import { connectMongoDB } from "@/lib/dbConnect";
import Player from "@/models/Player";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { cookies } from "next/headers";

export async function POST(req: any, res: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const login = searchParams.get("login");
  const password = searchParams.get("password");

  const response = NextResponse.json({ success: true }, { status: 200 });

  //LOOK HERE

  const FoundPlayer = await Player.find({
    username: login,
  });
  const passwordsMatch = await bcrypt.compare(
    password,
    FoundPlayer[0].password
  );
  if (!FoundPlayer) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  if (!passwordsMatch) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      playerID: FoundPlayer[0]._id.toString(),
    },
    process.env.SECURITY_KEY ?? "SOME_TOKEN"
  );
  response.cookies.set({
    name: "PLAYER_TOKEN",
    value: token,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return response;
}
