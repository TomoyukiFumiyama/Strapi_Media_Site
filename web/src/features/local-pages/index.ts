import { fetchStrapi } from "@/lib/strapi/client";
import { mapLocalPage } from "@/lib/strapi/mappers";
import { buildLocalPageDetailQuery } from "@/lib/strapi/queries";
import type { LocalPageModel } from "@/types/page-models";
import type { StrapiListResponse } from "@/types/strapi";

export async function fetchLocalPageBySlugs(areaSlug: string, serviceSlug: string): Promise<LocalPageModel | null> {
  const response = await fetchStrapi<StrapiListResponse<Record<string, unknown>>>(buildLocalPageDetailQuery(areaSlug, serviceSlug));
  const [first] = response.data;
  return first ? mapLocalPage(first) : null;
}
