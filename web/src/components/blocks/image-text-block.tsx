import type { ImageTextBlock } from "@/types/blocks";

export function ImageTextBlockView({ block }: { block: ImageTextBlock }) {
  return (
    <article>
      {block.heading ? <h2>{block.heading}</h2> : null}
      {block.body ? <p>{block.body}</p> : null}
      {block.image?.url ? <img src={block.image.url} alt={block.image.alternativeText ?? block.heading ?? ""} /> : null}
    </article>
  );
}
