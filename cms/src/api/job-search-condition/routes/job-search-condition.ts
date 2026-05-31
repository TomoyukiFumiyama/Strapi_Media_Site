import { factories } from "@strapi/strapi";

// job-search-condition の標準RESTルートを生成し、content-type定義とAPI公開経路を一対一で管理します。
export default factories.createCoreRouter("api::job-search-condition.job-search-condition");
