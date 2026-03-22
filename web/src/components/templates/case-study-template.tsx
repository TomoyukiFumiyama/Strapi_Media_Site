import { StrapiBlockRenderer } from "@/components/blocks/strapi-block-renderer";
import type { CaseStudyModel } from "@/types/page-models";

export function CaseStudyTemplate({ caseStudy }: { caseStudy: CaseStudyModel }) {
  return (
    <main>
      <h1>{caseStudy.title}</h1>
      {caseStudy.summary ? <p>{caseStudy.summary}</p> : null}
      <StrapiBlockRenderer blocks={caseStudy.blocks} />
    </main>
  );
}
