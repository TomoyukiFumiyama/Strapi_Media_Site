import { factories } from "@strapi/strapi";

// blog-post の標準RESTルートを生成し、content-type定義とAPI公開経路を一対一で管理します。
export default factories.createCoreRouter("api::blog-post.blog-post");
