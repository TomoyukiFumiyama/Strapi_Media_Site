import { CaseStudyCardGrid } from "@/components/sections/case-study-card-grid";
import { fetchCaseStudyList } from "@/features/case-studies";

export default async function CaseStudyListPage() {
  const caseStudies = await fetchCaseStudyList();

  return (
    <main>
      <h1>導入事例一覧</h1>
      <CaseStudyCardGrid items={caseStudies} />
    </main>
  );
}
