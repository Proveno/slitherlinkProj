import { connectMongoDB } from "@/lib/dbConnect";
import Rating from "@/models/Rating";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");
  if (_id) {
    const rating = await Rating.findById(_id);
    if (!rating) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: rating });
  }
  const ratings = await Rating.find({});
  return NextResponse.json({ success: true, data: ratings });
}
export async function POST(req: any) {
  await connectMongoDB();
  try {
    const body = await req.json();
    const rating = await Rating.create(body);
    return NextResponse.json({ success: true, data: rating });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the Rating." },
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
    const rating = await Rating.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    if (!rating) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rating });
  }
  return NextResponse.json(
    { message: "An error occurred while editing the Rating." },
    { status: 500 }
  );
}

export async function DELETE(req: any) {
  await connectMongoDB();
  const searchParams = req.nextUrl.searchParams;
  const _id = searchParams.get("id");

  if (_id) {
    const deletedRating = await Rating.findByIdAndDelete(_id);

    if (!deletedRating) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  }
  return NextResponse.json(
    { message: "An error occurred while deleting the Rating." },
    { status: 500 }
  );
}
