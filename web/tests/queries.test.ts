import test from "node:test";
import assert from "node:assert/strict";
import { areValidLocalPageSlugs, buildBlogDetailQuery, buildBlogListQuery, buildLocalPageSlug } from "../src/lib/strapi/queries";

test("buildBlogListQuery includes listing fields and sort", () => {
  const query = buildBlogListQuery();
  assert.match(query, /^\/api\/blog-posts\?/);
  assert.match(query, /fields\[0\]=title/);
  assert.match(query, /sort\[0\]=publishedAt:desc/);
});

test("buildBlogDetailQuery encodes slug", () => {
  const query = buildBlogDetailQuery("hello world");
  assert.match(query, /filters\[slug\]\[\$eq\]=hello%20world/);
});

test("buildLocalPageSlug composes area and service", () => {
  assert.equal(buildLocalPageSlug("tokyo", "web-production"), "tokyo-web-production");
});

test("areValidLocalPageSlugs validates kebab-case only", () => {
  assert.equal(areValidLocalPageSlugs("tokyo", "web-production"), true);
  assert.equal(areValidLocalPageSlugs("Tokyo", "web-production"), false);
  assert.equal(areValidLocalPageSlugs("tokyo", "web production"), false);
});
