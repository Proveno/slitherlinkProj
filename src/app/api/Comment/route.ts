import { connectMongoDB } from "@/lib/dbConnect";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");
  const player = searchParams.get("player");
  if (_id) {
    const comment = await Comment.findById(_id);
    if (!comment) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: comment });
  }
  if (player) {
    const comment = await Comment.find({ player: player });
    if (!comment) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: comment });
  }

  const comments = await Comment.find({});
  return NextResponse.json({ success: true, data: comments });
}
export async function POST(req: any) {
  await connectMongoDB();
  try {
    const body = await req.json();
    const comment = await Comment.create(body);
    return NextResponse.json({ success: true, data: comment });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the Comment." },
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
    const comment = await Comment.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!comment) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: comment });
  }
  return NextResponse.json(
    { message: "An error occurred while editing the Comment." },
    { status: 500 }
  );
}

export async function DELETE(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");

  if (_id) {
    const deletedComment = await Comment.findByIdAndDelete(_id);

    if (!deletedComment) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  }
  return NextResponse.json(
    { message: "An error occurred while deleting the Comment." },
    { status: 500 }
  );
}
