import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/templates/case-study-template";
import { fetchCaseStudyBySlug } from "@/features/case-studies";
import { resolvePageMetadata } from "@/lib/strapi/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    return resolvePageMetadata({ fallbackTitle: "Case Study" });
  }

  return resolvePageMetadata({
    pageSeo: {
      meta_title: caseStudy.seo.title,
      meta_description: caseStudy.seo.description,
      canonical_url: caseStudy.seo.canonicalUrl,
      noindex: caseStudy.seo.noindex,
    },
    fallbackTitle: caseStudy.title,
    fallbackDescription: caseStudy.summary,
  });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await fetchCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const resolvedCaseStudy = caseStudy;
  return <CaseStudyTemplate caseStudy={resolvedCaseStudy} />;
}
