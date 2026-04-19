import Link from "next/link";
import { StrapiBlockRenderer } from "@/components/blocks/strapi-block-renderer";
import { LocalPageHero } from "@/components/sections/local-page-hero";
import type { LocalPageModel } from "@/types/page-models";

function renderPointList(title: string, points: LocalPageModel["localProblemPoints"]) {
  if (points.length === 0) return null;

  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {points.map((point) => (
          <li key={point.title}>
            <h3>{point.title}</h3>
            {point.body ? <p>{point.body}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LocalPageTemplate({ localPage }: { localPage: LocalPageModel }) {
  return (
    <main>
      <LocalPageHero title={localPage.title} subtitle={`${localPage.areaSlug ?? ""} / ${localPage.serviceSlug ?? ""}`} />

      {localPage.localIntro ? (
        <section>
          <h2>地域概要</h2>
          <p>{localPage.localIntro}</p>
        </section>
      ) : null}

      {renderPointList("この地域でよくある課題", localPage.localProblemPoints)}
      {renderPointList("この地域での提供価値", localPage.localStrengths)}

      {localPage.localFaq.length > 0 ? (
        <section>
          <h2>よくある質問</h2>
          <dl>
            {localPage.localFaq.map((faq) => (
              <div key={faq.question}>
                <dt>{faq.question}</dt>
                {faq.answer ? <dd>{faq.answer}</dd> : null}
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {localPage.relatedCaseStudySlugs.length > 0 ? (
        <section>
          <h2>関連する導入事例</h2>
          <ul>
            {localPage.relatedCaseStudySlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/case-studies/${slug}`}>{slug}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {localPage.featuredDownloadSlug ? (
        <section>
          <h2>おすすめ資料</h2>
          <Link href={`/resources/${localPage.featuredDownloadSlug}`}>関連資料をダウンロード</Link>
        </section>
      ) : null}

      <StrapiBlockRenderer blocks={localPage.blocks} />
    </main>
  );
}
