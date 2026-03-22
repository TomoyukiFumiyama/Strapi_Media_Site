import type { CtaBannerBlock, DownloadCtaBlock, FaqSectionBlock, ImageTextBlock, RichTextBlock, StatsSectionBlock, OfficeInfoBlock, StrapiBlock } from "@/types/blocks";
import { CtaBannerBlockView } from "@/components/blocks/cta-banner-block";
import { DownloadCtaBlockView } from "@/components/blocks/download-cta-block";
import { FaqSectionBlockView } from "@/components/blocks/faq-section-block";
import { ImageTextBlockView } from "@/components/blocks/image-text-block";
import { OfficeInfoBlockView } from "@/components/blocks/office-info-block";
import { RelatedCaseStudiesBlockView } from "@/components/blocks/related-case-studies-block";
import { RelatedPostsBlockView } from "@/components/blocks/related-posts-block";
import { RichTextBlockView } from "@/components/blocks/rich-text-block";
import { StatsSectionBlockView } from "@/components/blocks/stats-section-block";

export function StrapiBlockRenderer({ blocks }: { blocks: StrapiBlock[] }) {
  return (
    <section>
      {blocks.map((block, index) => {
        const key = `${block.__component}-${block.id ?? index}`;

        switch (block.__component) {
          case "blocks.rich-text":
            return <RichTextBlockView key={key} block={block as RichTextBlock} />;
          case "blocks.image-text":
            return <ImageTextBlockView key={key} block={block as ImageTextBlock} />;
          case "blocks.faq-section":
            return <FaqSectionBlockView key={key} block={block as FaqSectionBlock} />;
          case "blocks.cta-banner":
            return <CtaBannerBlockView key={key} block={block as CtaBannerBlock} />;
          case "blocks.stats-section":
            return <StatsSectionBlockView key={key} block={block as StatsSectionBlock} />;
          case "blocks.download-cta":
            return <DownloadCtaBlockView key={key} block={block as DownloadCtaBlock} />;
          case "blocks.office-info":
            return <OfficeInfoBlockView key={key} block={block as OfficeInfoBlock} />;
          case "blocks.related-posts":
            return <RelatedPostsBlockView key={key} />;
          case "blocks.related-case-studies":
            return <RelatedCaseStudiesBlockView key={key} />;
          default:
            return <article key={key}>Unsupported block: {block.__component}</article>;
        }
      })}
    </section>
  );
}
