import test from "node:test";
import assert from "node:assert/strict";
import { buildMetadata } from "../src/lib/seo/build-metadata";

test("metadata priority is page > fallback > global for title/description/og", () => {
  const metadata = buildMetadata({
    pageSeo: { title: "page", description: "page desc", canonicalUrl: "https://page", ogImageUrl: "https://page.png", noindex: true },
    globalSeo: { title: "global", description: "global desc", canonicalUrl: "https://global", ogImageUrl: "https://global.png", noindex: false },
    fallbackTitle: "fallback",
    fallbackDescription: "fallback desc",
    fallbackImageUrl: "https://fallback.png",
  });

  assert.equal(metadata.title, "page");
  assert.equal(metadata.description, "page desc");
  assert.equal(metadata.alternates?.canonical, "https://page");
  assert.equal(metadata.openGraph?.images?.[0]?.url, "https://page.png");
  assert.deepEqual(metadata.robots, { index: false, follow: true });
});

test("metadata falls back when page seo is absent", () => {
  const metadata = buildMetadata({
    globalSeo: { title: "global", description: "global desc", canonicalUrl: "https://global", ogImageUrl: "https://global.png" },
    fallbackTitle: "fallback",
    fallbackDescription: "fallback desc",
    fallbackImageUrl: "https://fallback.png",
  });

  assert.equal(metadata.title, "fallback");
  assert.equal(metadata.description, "fallback desc");
  assert.equal(metadata.alternates?.canonical, "https://global");
  assert.equal(metadata.openGraph?.images?.[0]?.url, "https://fallback.png");
});
