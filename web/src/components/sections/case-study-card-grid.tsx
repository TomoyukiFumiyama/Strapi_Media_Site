import Link from "next/link";
import type { ContentSummary } from "@/types/page-models";

export function CaseStudyCardGrid({ items }: { items: ContentSummary[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.slug}>
          <Link href={`/case-studies/${item.slug}`}>{item.title}</Link>
          {item.summary ? <p>{item.summary}</p> : null}
        </li>
      ))}
    </ul>
  );
}
