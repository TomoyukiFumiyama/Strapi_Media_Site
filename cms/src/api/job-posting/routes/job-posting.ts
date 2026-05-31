import { factories } from "@strapi/strapi";

// job-posting の標準RESTルートを生成し、content-type定義とAPI公開経路を一対一で管理します。
export default factories.createCoreRouter("api::job-posting.job-posting");
