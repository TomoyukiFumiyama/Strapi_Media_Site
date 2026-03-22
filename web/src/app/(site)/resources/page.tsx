import Link from "next/link";
import { fetchLeadMagnetList } from "@/features/lead-magnets";

export default async function ResourcesListPage() {
  const resources = await fetchLeadMagnetList();

  return (
    <main>
      <h1>資料一覧</h1>
      <ul>
        {resources.map((resource) => (
          <li key={resource.slug}>
            <Link href={`/resources/${resource.slug}`}>{resource.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
