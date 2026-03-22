import { fetchStrapi } from "@/lib/strapi/client";
import { mapLeadMagnet, mapListItemToSummary } from "@/lib/strapi/mappers";
import { buildResourceDetailQuery, buildResourceListQuery } from "@/lib/strapi/queries";
import type { ContentSummary, LeadMagnetModel } from "@/types/page-models";
import type { StrapiListResponse } from "@/types/strapi";

export async function fetchLeadMagnetList(): Promise<ContentSummary[]> {
  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(buildResourceListQuery());
  return response.data.map((entry) => mapListItemToSummary(entry));
}

export async function fetchLeadMagnetBySlug(slug: string): Promise<LeadMagnetModel | null> {
  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(buildResourceDetailQuery(slug));
  const [first] = response.data;
  return first ? mapLeadMagnet(first) : null;
}
