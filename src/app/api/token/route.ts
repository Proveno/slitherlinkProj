import { verify } from "jsonwebtoken";
import Player from "@/models/Player";
import { connectMongoDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: any, res: any) {
  await connectMongoDB();

  const cookieStore = cookies();
  const jwt = cookieStore.get("PLAYER_TOKEN")?.value;
  const PlayerID: any = verify(
    jwt?.toString() ?? "TOKEN",
    process.env.SECURITY_KEY ?? "Security"
  );
  const FoundPlayer = await Player.findById(PlayerID.playerID);
  if (FoundPlayer) {
    return NextResponse.json({ success: true, playerData: FoundPlayer });
  }
  return NextResponse.json({ success: false });
}
