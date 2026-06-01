import { factories } from "@strapi/strapi";

// tag のデータ取得・永続化はStrapi標準Serviceに集約し、拡張時の責務を分離します。
export default factories.createCoreService("api::tag.tag");
