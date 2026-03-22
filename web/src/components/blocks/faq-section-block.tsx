import type { FaqSectionBlock } from "@/types/blocks";

export function FaqSectionBlockView({ block }: { block: FaqSectionBlock }) {
  return (
    <section>
      {block.heading ? <h2>{block.heading}</h2> : null}
      <dl>
        {(block.items ?? []).map((item, index) => (
          <div key={index}>
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
