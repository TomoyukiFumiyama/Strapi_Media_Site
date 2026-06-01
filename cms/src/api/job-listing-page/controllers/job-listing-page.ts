import { factories } from "@strapi/strapi";

// job-listing-page のREST操作をStrapi標準のControllerに委譲し、将来の個別処理追加箇所を明確にします。
export default factories.createCoreController("api::job-listing-page.job-listing-page");
