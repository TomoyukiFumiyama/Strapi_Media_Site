import { factories } from "@strapi/strapi";

// job-search-condition のREST操作をStrapi標準のControllerに委譲し、将来の個別処理追加箇所を明確にします。
export default factories.createCoreController("api::job-search-condition.job-search-condition");
