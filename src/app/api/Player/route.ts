import { connectMongoDB } from "@/lib/dbConnect";
import Player from "@/models/Player";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");
  if (_id) {
    const player = await Player.findById(_id);
    if (!player) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: player });
  }

  const players = await Player.find({});
  return NextResponse.json({ success: true, data: players });
}
export async function POST(req: any) {
  await connectMongoDB();
  try {
    const body = await req.json();
    const player = await Player.create(body);
    return NextResponse.json({ success: true, data: player });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the player." },
      { status: 500 }
    );
  }
}
export async function PUT(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");

  if (_id) {
    const body = await req.json();
    const player = await Player.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!player) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: player });
  }
  return NextResponse.json(
    { message: "An error occurred while editing the player." },
    { status: 500 }
  );
}

export async function DELETE(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");

  if (_id) {
    const deletedPlayer = await Player.findByIdAndDelete(_id);

    if (!deletedPlayer) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  }
  return NextResponse.json(
    { message: "An error occurred while deleting the player." },
    { status: 500 }
  );
}
