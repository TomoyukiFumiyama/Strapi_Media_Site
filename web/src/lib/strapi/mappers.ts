import type {
  BlogPostModel,
  CaseStudyModel,
  ContentSummary,
  LeadMagnetModel,
  LocalPageModel,
  SeoModel,
} from "@/types/page-models";
import type { StrapiBlock } from "@/types/blocks";
import type { StrapiSeo } from "@/types/strapi";

function pickText(input: unknown): string | undefined {
  return typeof input === "string" && input.trim().length > 0 ? input : undefined;
}

function pickBlocks(input: unknown): StrapiBlock[] {
  return Array.isArray(input) ? (input as StrapiBlock[]) : [];
}

function pickBoolean(input: unknown, fallback = false): boolean {
  return typeof input === "boolean" ? input : fallback;
}

function pickImageUrl(input: unknown): string | undefined {
  if (!input || typeof input !== "object") return undefined;
  const objectInput = input as { url?: string; data?: { attributes?: { url?: string } } };
  return pickText(objectInput.url) ?? pickText(objectInput.data?.attributes?.url);
}

export function mapSeo(input: StrapiSeo | undefined): SeoModel {
  return {
    title: pickText(input?.meta_title),
    description: pickText(input?.meta_description),
    canonicalUrl: pickText(input?.canonical_url),
    noindex: pickBoolean(input?.noindex),
    ogImageUrl: pickImageUrl(input?.og_image),
  };
}

export function mapListItemToSummary(input: Record<string, unknown>): ContentSummary {
  const media = input.cover_image as { url?: string; data?: { attributes?: { url?: string } } } | undefined;

  return {
    title: pickText(input.title) ?? "Untitled",
    slug: pickText(input.slug) ?? "",
    summary: pickText(input.excerpt) ?? pickText(input.summary),
    coverImageUrl: pickImageUrl(media),
    isFeatured: pickBoolean(input.is_featured),
  };
}

export function mapBlogPost(input: Record<string, unknown>): BlogPostModel {
  return {
    title: pickText(input.title) ?? "Untitled",
    slug: pickText(input.slug) ?? "",
    excerpt: pickText(input.excerpt),
    blocks: pickBlocks(input.content_blocks),
    seo: mapSeo((input.seo ?? {}) as StrapiSeo),
  };
}

export function mapCaseStudy(input: Record<string, unknown>): CaseStudyModel {
  return {
    title: pickText(input.title) ?? "Untitled",
    slug: pickText(input.slug) ?? "",
    summary: pickText(input.summary),
    blocks: pickBlocks(input.content_blocks),
    seo: mapSeo((input.seo ?? {}) as StrapiSeo),
  };
}

export function mapLeadMagnet(input: Record<string, unknown>): LeadMagnetModel {
  return {
    title: pickText(input.title) ?? "Untitled",
    slug: pickText(input.slug) ?? "",
    summary: pickText(input.summary),
    thankYouHeading: pickText(input.thank_you_heading),
    thankYouBody: pickText(input.thank_you_body),
    blocks: pickBlocks(input.landing_blocks),
    seo: mapSeo((input.seo ?? {}) as StrapiSeo),
  };
}

export function mapLocalPage(input: Record<string, unknown>): LocalPageModel {
  const area = (input.area ?? {}) as { slug?: string };
  const service = (input.service ?? {}) as { slug?: string };

  return {
    title: pickText(input.title) ?? "Untitled",
    slug: pickText(input.slug) ?? "",
    areaSlug: pickText(area.slug),
    serviceSlug: pickText(service.slug),
    canonicalUrl: pickText(input.canonical_url),
    noindex: pickBoolean(input.noindex),
    blocks: pickBlocks(input.content_blocks),
    seo: mapSeo((input.seo ?? {}) as StrapiSeo),
  };
}
