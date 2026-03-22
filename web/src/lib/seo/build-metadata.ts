import type { Metadata } from "next";
import type { SeoModel } from "@/types/page-models";

type MetadataInput = {
  pageSeo?: SeoModel;
  globalSeo?: SeoModel;
  fallbackTitle: string;
  fallbackDescription?: string;
  fallbackImageUrl?: string;
};

export function buildMetadata({
  pageSeo,
  globalSeo,
  fallbackTitle,
  fallbackDescription,
  fallbackImageUrl,
}: MetadataInput): Metadata {
  const title = pageSeo?.title ?? fallbackTitle ?? globalSeo?.title;
  const description = pageSeo?.description ?? fallbackDescription ?? globalSeo?.description;
  const canonical = pageSeo?.canonicalUrl ?? globalSeo?.canonicalUrl;
  const ogImageUrl = pageSeo?.ogImageUrl ?? fallbackImageUrl ?? globalSeo?.ogImageUrl;
  const noindex = pageSeo?.noindex ?? globalSeo?.noindex;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: ogImageUrl ? { images: [{ url: ogImageUrl }] } : undefined,
  };
}
