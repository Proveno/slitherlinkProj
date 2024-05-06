import { connectMongoDB } from "@/lib/dbConnect";
import Score from "@/models/Score";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");
  if (_id) {
    const score = await Score.findById(_id);
    if (!score) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: score });
  }

  const scores = await Score.find({});
  return NextResponse.json({ success: true, data: scores });
}
export async function POST(req: any) {
  await connectMongoDB();
  try {
    const body = await req.json();
    const score = await Score.create(body);
    return NextResponse.json({ success: true, data: score });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the score." },
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
    const score = await Score.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!score) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: score });
  }
  return NextResponse.json(
    { message: "An error occurred while editing the score." },
    { status: 500 }
  );
}

export async function DELETE(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");

  if (_id) {
    const deletedScore = await Score.findByIdAndDelete(_id);

    if (!deletedScore) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  }
  return NextResponse.json(
    { message: "An error occurred while deleting the score." },
    { status: 500 }
  );
}
