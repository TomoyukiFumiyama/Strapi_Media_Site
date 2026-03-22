import { fetchStrapi } from "@/lib/strapi/client";
import { mapBlogPost, mapListItemToSummary } from "@/lib/strapi/mappers";
import { buildBlogDetailQuery, buildBlogListQuery } from "@/lib/strapi/queries";
import type { BlogPostModel, ContentSummary } from "@/types/page-models";
import type { StrapiListResponse } from "@/types/strapi";

export async function fetchBlogList(): Promise<ContentSummary[]> {
  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(buildBlogListQuery());
  return response.data.map((entry) => mapListItemToSummary(entry));
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostModel | null> {
  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(buildBlogDetailQuery(slug));
  const [first] = response.data;
  return first ? mapBlogPost(first) : null;
}
