import { factories } from "@strapi/strapi";

// lead-magnet の標準RESTルートを生成し、content-type定義とAPI公開経路を一対一で管理します。
export default factories.createCoreRouter("api::lead-magnet.lead-magnet");
