import { DETAIL_POPULATE_BY_API, GLOBAL_POPULATE, LISTING_POPULATE_BY_API } from "./populate";

const API = {
  blog: "blog-posts",
  caseStudies: "case-studies",
  localPages: "local-pages",
  resources: "lead-magnets",
  global: "global",
} as const;

function resolveListingPopulate(apiName: string): string {
  return LISTING_POPULATE_BY_API[apiName] ?? "";
}

function resolveDetailPopulate(apiName: string): string {
  return DETAIL_POPULATE_BY_API[apiName] ?? "";
}

export function buildListQuery(apiName: string): string {
  const populate = resolveListingPopulate(apiName);
  return `/api/${apiName}?${populate}&sort[0]=publishedAt:desc`;
}

export function buildDetailQuery(apiName: string, slug: string): string {
  const populate = resolveDetailPopulate(apiName);
  return `/api/${apiName}?filters[slug][$eq]=${encodeURIComponent(slug)}&${populate}&pagination[pageSize]=1`;
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
  return `${areaSlug.trim()}-${serviceSlug.trim()}`;
}

export function areValidLocalPageSlugs(areaSlug: string, serviceSlug: string): boolean {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(areaSlug) && slugPattern.test(serviceSlug);
}

export function buildLocalPageDetailQuery(areaSlug: string, serviceSlug: string): string {
  return buildDetailQuery(API.localPages, buildLocalPageSlug(areaSlug, serviceSlug));
}

export function buildGlobalQuery(): string {
  return `/api/${API.global}?${GLOBAL_POPULATE}`;
}
