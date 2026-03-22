import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalPageTemplate } from "@/components/templates/local-page-template";
import { fetchLocalPageBySlugs } from "@/features/local-pages";
import { resolvePageMetadata } from "@/lib/strapi/metadata";

export async function generateMetadata({ params }: { params: Promise<{ areaSlug: string; serviceSlug: string }> }): Promise<Metadata> {
  const { areaSlug, serviceSlug } = await params;
  const localPage = await fetchLocalPageBySlugs(areaSlug, serviceSlug);

  if (!localPage) {
    return resolvePageMetadata({ fallbackTitle: "Local Page" });
  }

  return resolvePageMetadata({
    pageSeo: {
      meta_title: localPage.seo.title,
      meta_description: localPage.seo.description,
      canonical_url: localPage.canonicalUrl ?? localPage.seo.canonicalUrl,
      noindex: localPage.noindex || localPage.seo.noindex,
    },
    fallbackTitle: localPage.title,
  });
}

export default async function LocalPage({ params }: { params: Promise<{ areaSlug: string; serviceSlug: string }> }) {
  const { areaSlug, serviceSlug } = await params;
  const localPage = await fetchLocalPageBySlugs(areaSlug, serviceSlug);

  if (!localPage) {
    notFound();
  }

  const resolvedLocalPage = localPage;
  return <LocalPageTemplate localPage={resolvedLocalPage} />;
}
