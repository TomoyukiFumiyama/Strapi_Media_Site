import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { slug?: string; email?: string };

  if (!body.slug) {
    return NextResponse.json({ ok: false, error: "slug is required" }, { status: 400 });
  }

  if (!body.email) {
    return NextResponse.json({ ok: false, error: "email is required" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: `download flow scaffold for ${body.slug}` });
}
