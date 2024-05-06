import { connectMongoDB } from "@/lib/dbConnect";
import Player from "@/models/Player";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: any) {
  await connectMongoDB();
  try {
    const body = await req.json();
    var hop = body;
    hop.password = await bcrypt.hash(body.password, 10);
    const player = await Player.create(hop);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the player." },
      { status: 500 }
    );
  }
}
