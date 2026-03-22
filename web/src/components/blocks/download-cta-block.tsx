import type { DownloadCtaBlock } from "@/types/blocks";

export function DownloadCtaBlockView({ block }: { block: DownloadCtaBlock }) {
  return (
    <aside>
      {block.heading ? <h2>{block.heading}</h2> : null}
      {block.body ? <p>{block.body}</p> : null}
    </aside>
  );
}
