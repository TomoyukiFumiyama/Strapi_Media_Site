import { factories } from "@strapi/strapi";

// blog-category の標準RESTルートを生成し、content-type定義とAPI公開経路を一対一で管理します。
export default factories.createCoreRouter("api::blog-category.blog-category");
