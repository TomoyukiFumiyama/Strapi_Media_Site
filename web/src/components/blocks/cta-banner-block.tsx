import Link from "next/link";
import type { CtaBannerBlock } from "@/types/blocks";

export function CtaBannerBlockView({ block }: { block: CtaBannerBlock }) {
  return (
    <aside>
      {block.heading ? <h2>{block.heading}</h2> : null}
      {block.body ? <p>{block.body}</p> : null}
      {block.cta?.label && block.cta.url ? <Link href={block.cta.url}>{block.cta.label}</Link> : null}
    </aside>
  );
}
