import test from "node:test";
import assert from "node:assert/strict";
import { mapModelPaths } from "../src/lib/strapi/revalidate-paths";

test("mapModelPaths resolves model specific paths", () => {
  assert.deepEqual(mapModelPaths({ model: "blog-post", slug: "hello" }), ["/blog", "/blog/hello"]);
  assert.deepEqual(mapModelPaths({ model: "lead-magnet", slug: "res" }), ["/resources", "/resources/res", "/resources/res/thanks"]);
  assert.deepEqual(mapModelPaths({ model: "local-page", areaSlug: "tokyo", serviceSlug: "web-production" }), ["/areas/tokyo/web-production"]);
});

test("mapModelPaths prioritizes explicit unique paths", () => {
  assert.deepEqual(mapModelPaths({ paths: ["/blog", "/blog", "invalid"] }), ["/blog"]);
});
