import type { StrapiBlock } from "@/types/blocks";

export type SeoModel = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  ogImageUrl?: string;
};

export type ContentSummary = {
  title: string;
  slug: string;
  summary?: string;
  coverImageUrl?: string;
  isFeatured: boolean;
};

export type BlogPostModel = {
  title: string;
  slug: string;
  excerpt?: string;
  blocks: StrapiBlock[];
  seo: SeoModel;
};

export type CaseStudyModel = {
  title: string;
  slug: string;
  summary?: string;
  blocks: StrapiBlock[];
  seo: SeoModel;
};

export type LeadMagnetModel = {
  title: string;
  slug: string;
  summary?: string;
  thankYouHeading?: string;
  thankYouBody?: string;
  blocks: StrapiBlock[];
  seo: SeoModel;
};

export type LocalPageModel = {
  title: string;
  slug: string;
  areaSlug?: string;
  serviceSlug?: string;
  canonicalUrl?: string;
  noindex: boolean;
  blocks: StrapiBlock[];
  seo: SeoModel;
};
