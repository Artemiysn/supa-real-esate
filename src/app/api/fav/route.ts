import { getServerAuthSession } from "@/auth";
import { db } from "@/modules/db";
import { NextRequest, NextResponse } from "next/server";

// server action could be more concise, but anyways...

export async function POST(req: NextRequest) {
  const sessionData = await getServerAuthSession();

  if (!sessionData?.user) {
    return NextResponse.json(
      { message: "user undefined" },
      {
        status: 500,
      }
    );
  }

  const { userId, postId } = await req.json();
  try {
    await db.FavouredPosts.create({
      data: {
        userId: String(userId).substring(0, 60),
        postId: String(postId).substring(0, 60),
      },
    });
    return NextResponse.json(
      { message: "success" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  const sessionData = await getServerAuthSession();

  if (!sessionData?.user) {
    return NextResponse.json(
      { message: "user undefined" },
      {
        status: 500,
      }
    );
  }

  const { favouredPostId } = await req.json();
  try {
    await db.FavouredPosts.delete({
      where: {
        id: favouredPostId,
      },
    });
    return NextResponse.json(
      { message: "success" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err },
      {
        status: 500,
      }
    );
  } finally {
    await db.$disconnect();
  }
}
