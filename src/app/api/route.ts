import { connectMongoDB } from "@/app/lib/dbConnect";
import Player from "@/app/models/Player";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongoDB();

  return NextResponse.json({ success: true });
}
