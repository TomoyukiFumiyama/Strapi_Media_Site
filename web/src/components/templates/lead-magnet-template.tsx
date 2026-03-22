import { StrapiBlockRenderer } from "@/components/blocks/strapi-block-renderer";
import { DownloadForm } from "@/components/sections/download-form";
import type { LeadMagnetModel } from "@/types/page-models";

export function LeadMagnetTemplate({ leadMagnet }: { leadMagnet: LeadMagnetModel }) {
  return (
    <main>
      <h1>{leadMagnet.title}</h1>
      {leadMagnet.summary ? <p>{leadMagnet.summary}</p> : null}
      <DownloadForm formId={leadMagnet.slug} />
      <StrapiBlockRenderer blocks={leadMagnet.blocks} />
    </main>
  );
}
