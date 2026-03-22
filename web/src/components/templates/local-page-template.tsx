import { StrapiBlockRenderer } from "@/components/blocks/strapi-block-renderer";
import { LocalPageHero } from "@/components/sections/local-page-hero";
import type { LocalPageModel } from "@/types/page-models";

export function LocalPageTemplate({ localPage }: { localPage: LocalPageModel }) {
  return (
    <main>
      <LocalPageHero title={localPage.title} subtitle={`${localPage.areaSlug ?? ""} / ${localPage.serviceSlug ?? ""}`} />
      <StrapiBlockRenderer blocks={localPage.blocks} />
    </main>
  );
}
