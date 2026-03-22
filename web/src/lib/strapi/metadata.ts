import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { mapSeo } from "@/lib/strapi/mappers";

export function resolvePageMetadata(input: {
  pageSeo?: Record<string, unknown>;
  globalSeo?: Record<string, unknown>;
  fallbackTitle: string;
  fallbackDescription?: string;
  fallbackImageUrl?: string;
}): Metadata {
  return buildMetadata({
    pageSeo: mapSeo(input.pageSeo as never),
    globalSeo: mapSeo(input.globalSeo as never),
    fallbackTitle: input.fallbackTitle,
    fallbackDescription: input.fallbackDescription,
    fallbackImageUrl: input.fallbackImageUrl,
  });
}
