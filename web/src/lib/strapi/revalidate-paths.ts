export type RevalidateBody = {
  model?: "blog-post" | "case-study" | "local-page" | "lead-magnet";
  slug?: string;
  areaSlug?: string;
  serviceSlug?: string;
  paths?: string[];
};

function uniquePaths(paths: string[]): string[] {
  return [...new Set(paths.filter((path) => path.startsWith("/")))];
}

export function mapModelPaths(body: RevalidateBody): string[] {
  if (body.paths && body.paths.length > 0) {
    return uniquePaths(body.paths);
  }

  switch (body.model) {
    case "blog-post":
      return uniquePaths(body.slug ? ["/blog", `/blog/${body.slug}`] : ["/blog"]);
    case "case-study":
      return uniquePaths(body.slug ? ["/case-studies", `/case-studies/${body.slug}`] : ["/case-studies"]);
    case "lead-magnet":
      return uniquePaths(body.slug ? ["/resources", `/resources/${body.slug}`, `/resources/${body.slug}/thanks`] : ["/resources"]);
    case "local-page":
      if (body.areaSlug && body.serviceSlug) {
        return uniquePaths([`/areas/${body.areaSlug}/${body.serviceSlug}`]);
      }
      return [];
    default:
      return [];
  }
}
