import type { OfficeInfoBlock } from "@/types/blocks";

export function OfficeInfoBlockView({ block }: { block: OfficeInfoBlock }) {
  return (
    <section>
      {block.heading ? <h2>{block.heading}</h2> : null}
      <p>Office information block</p>
    </section>
  );
}
