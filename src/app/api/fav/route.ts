import { getServerAuthSession } from "@/auth";
import { db } from "@/modules/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

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

  // const { userId, postId } = req.body;
  const { userId, postId } = await req.json();
  try {
    const result = await db.FavouredPosts.create({
      data: {
        userId: String(userId).substring(0, 60),
        postId: String(postId).substring(0, 60),
      },
    });
    return NextResponse.json(
      { message: 'success' },
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
    const result = await db.FavouredPosts.delete({
      where: {
        id: favouredPostId,
      },
    });
    return NextResponse.json(
      { message: 'success' },
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
