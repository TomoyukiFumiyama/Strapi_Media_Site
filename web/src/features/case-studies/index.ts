import { fetchStrapi } from "@/lib/strapi/client";
import { mapCaseStudy, mapListItemToSummary } from "@/lib/strapi/mappers";
import { buildCaseStudyDetailQuery, buildCaseStudyListQuery } from "@/lib/strapi/queries";
import type { CaseStudyModel, ContentSummary } from "@/types/page-models";
import type { StrapiListResponse } from "@/types/strapi";

export async function fetchCaseStudyList(): Promise<ContentSummary[]> {
  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(buildCaseStudyListQuery());
  return response.data.map((entry) => mapListItemToSummary(entry));
}

export async function fetchCaseStudyBySlug(slug: string): Promise<CaseStudyModel | null> {
  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(buildCaseStudyDetailQuery(slug));
  const [first] = response.data;
  return first ? mapCaseStudy(first) : null;
}
