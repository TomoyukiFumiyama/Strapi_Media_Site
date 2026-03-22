import type { StatsSectionBlock } from "@/types/blocks";

export function StatsSectionBlockView({ block }: { block: StatsSectionBlock }) {
  return (
    <section>
      {block.heading ? <h2>{block.heading}</h2> : null}
      <ul>
        {(block.stats ?? []).map((stat, index) => (
          <li key={index}>{stat.label}: {stat.value}{stat.suffix}</li>
        ))}
      </ul>
    </section>
  );
}
