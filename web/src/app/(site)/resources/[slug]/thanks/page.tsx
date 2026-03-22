import { notFound } from "next/navigation";
import { fetchLeadMagnetBySlug } from "@/features/lead-magnets";

export default async function ResourceThanksPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const leadMagnet = await fetchLeadMagnetBySlug(slug);

  if (!leadMagnet) {
    notFound();
  }

  const resolvedLeadMagnet = leadMagnet;

  return (
    <main>
      <h1>{resolvedLeadMagnet.thankYouHeading ?? "ダウンロードありがとうございます"}</h1>
      <p>{resolvedLeadMagnet.thankYouBody ?? "メールをご確認ください。"}</p>
    </main>
  );
}
