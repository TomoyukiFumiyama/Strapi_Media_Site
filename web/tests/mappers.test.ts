import test from "node:test";
import assert from "node:assert/strict";
import { mapLocalPage } from "../src/lib/strapi/mappers";

test("mapLocalPage maps local seo sections and relation fallbacks safely", () => {
  const model = mapLocalPage({
    title: "Tokyo Page",
    slug: "tokyo-web-production",
    area: { data: { attributes: { slug: "tokyo" } } },
    service: { data: { attributes: { slug: "web-production" } } },
    local_intro: "local intro",
    local_problem_points: [{ title: "課題", body: "body" }, { title: "", body: "invalid" }],
    local_strengths: [{ title: "強み" }],
    local_faq: [{ question: "Q", answer: "A" }, { question: "", answer: "invalid" }],
    related_case_studies: [{ slug: "local-seo-lp-case" }],
    featured_download: { data: { attributes: { slug: "strapi-nextjs-checklist" } } },
    seo: { meta_title: "meta" },
  });

  assert.equal(model.areaSlug, "tokyo");
  assert.equal(model.serviceSlug, "web-production");
  assert.equal(model.localProblemPoints.length, 1);
  assert.equal(model.localStrengths.length, 1);
  assert.equal(model.localFaq.length, 1);
  assert.deepEqual(model.relatedCaseStudySlugs, ["local-seo-lp-case"]);
  assert.equal(model.featuredDownloadSlug, "strapi-nextjs-checklist");
});
