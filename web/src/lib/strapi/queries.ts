import { DETAIL_POPULATE, GLOBAL_POPULATE, LISTING_POPULATE } from "./populate";

const API = {
  blog: "blog-posts",
  caseStudies: "case-studies",
  localPages: "local-pages",
  resources: "lead-magnets",
  global: "global",
} as const;

export function buildListQuery(apiName: string): string {
  return `/api/${apiName}?${LISTING_POPULATE}&sort[0]=publishedAt:desc`;
}

export function buildDetailQuery(apiName: string, slug: string): string {
  return `/api/${apiName}?filters[slug][$eq]=${encodeURIComponent(slug)}&${DETAIL_POPULATE}&pagination[pageSize]=1`;
}

export function buildBlogListQuery(): string {
  return buildListQuery(API.blog);
}

export function buildBlogDetailQuery(slug: string): string {
  return buildDetailQuery(API.blog, slug);
}

export function buildCaseStudyListQuery(): string {
  return buildListQuery(API.caseStudies);
}

export function buildCaseStudyDetailQuery(slug: string): string {
  return buildDetailQuery(API.caseStudies, slug);
}

export function buildResourceListQuery(): string {
  return buildListQuery(API.resources);
}

export function buildResourceDetailQuery(slug: string): string {
  return buildDetailQuery(API.resources, slug);
}

export function buildLocalPageSlug(areaSlug: string, serviceSlug: string): string {
  return `${areaSlug}-${serviceSlug}`;
}

export function buildLocalPageDetailQuery(areaSlug: string, serviceSlug: string): string {
  return buildDetailQuery(API.localPages, buildLocalPageSlug(areaSlug, serviceSlug));
}

export function buildGlobalQuery(): string {
  return `/api/${API.global}?${GLOBAL_POPULATE}`;
}
