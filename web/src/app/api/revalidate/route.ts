import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type RevalidateBody = {
  secret?: string;
  model?: "blog-post" | "case-study" | "local-page" | "lead-magnet";
  slug?: string;
  areaSlug?: string;
  serviceSlug?: string;
  paths?: string[];
};

function mapModelPaths(body: RevalidateBody): string[] {
  if (body.paths && body.paths.length > 0) {
    return body.paths;
  }

  switch (body.model) {
    case "blog-post":
      return body.slug ? ["/blog", `/blog/${body.slug}`] : ["/blog"];
    case "case-study":
      return body.slug ? ["/case-studies", `/case-studies/${body.slug}`] : ["/case-studies"];
    case "lead-magnet":
      return body.slug ? ["/resources", `/resources/${body.slug}`, `/resources/${body.slug}/thanks`] : ["/resources"];
    case "local-page": {
      if (body.areaSlug && body.serviceSlug) {
        return [`/areas/${body.areaSlug}/${body.serviceSlug}`];
      }
      return [];
    }
    default:
      return [];
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as RevalidateBody;

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
