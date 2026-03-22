import type { RichTextBlock } from "@/types/blocks";

export function RichTextBlockView({ block }: { block: RichTextBlock }) {
  return (
    <article>
      {block.heading ? <h2>{block.heading}</h2> : null}
      {block.body ? <div>{block.body}</div> : null}
    </article>
  );
}
