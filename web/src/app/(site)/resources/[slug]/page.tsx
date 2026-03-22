import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeadMagnetTemplate } from "@/components/templates/lead-magnet-template";
import { fetchLeadMagnetBySlug } from "@/features/lead-magnets";
import { resolvePageMetadata } from "@/lib/strapi/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const leadMagnet = await fetchLeadMagnetBySlug(slug);

  if (!leadMagnet) {
    return resolvePageMetadata({ fallbackTitle: "Resources" });
  }

  return resolvePageMetadata({
    pageSeo: {
      meta_title: leadMagnet.seo.title,
      meta_description: leadMagnet.seo.description,
      canonical_url: leadMagnet.seo.canonicalUrl,
      noindex: leadMagnet.seo.noindex,
    },
    fallbackTitle: leadMagnet.title,
    fallbackDescription: leadMagnet.summary,
  });
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const leadMagnet = await fetchLeadMagnetBySlug(slug);

  if (!leadMagnet) {
    notFound();
  }

  const resolvedLeadMagnet = leadMagnet;
  return <LeadMagnetTemplate leadMagnet={resolvedLeadMagnet} />;
}
