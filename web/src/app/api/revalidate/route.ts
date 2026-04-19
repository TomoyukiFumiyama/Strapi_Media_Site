import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { mapModelPaths, type RevalidateBody } from "@/lib/strapi/revalidate-paths";

type RevalidateRequestBody = RevalidateBody & {
  secret?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as RevalidateRequestBody;

  if (!process.env.REVALIDATE_SECRET || body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const paths = mapModelPaths(body);

  if (paths.length === 0) {
    return NextResponse.json({ ok: false, error: "no paths" }, { status: 400 });
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
