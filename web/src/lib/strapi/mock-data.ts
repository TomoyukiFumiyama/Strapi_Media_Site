import type { StrapiListResponse } from "@/types/strapi";

type StrapiRecord = Record<string, unknown>;

const blogPosts: StrapiRecord[] = [
  {
    id: 1,
    title: "Strapi + Next.jsで始めるブログ運用",
    slug: "start-strapi-nextjs-blog",
    excerpt: "MVPで最初に整えるべきデータ設計とルーティングの要点をまとめました。",
    content_blocks: [
      {
        __component: "blocks.rich-text",
        id: 101,
        heading: "MVP構築の要点",
        body: "一覧と詳細の取得クエリを分け、UIにはmapper済みデータだけを流す。",
      },
      {
        __component: "blocks.cta-banner",
        id: 102,
        heading: "設計チェックリストを配布中",
        body: "導入前に押さえるべき項目を1枚に整理しました。",
        cta: { label: "資料を見る", url: "/resources/strapi-nextjs-checklist" },
      },
    ],
    seo: {
      meta_title: "Strapi + Next.jsで始めるブログ運用",
      meta_description: "MVPで必要なデータ設計・取得設計の最小構成。",
    },
  },
];

const caseStudies: StrapiRecord[] = [
  {
    id: 11,
    title: "地域サービスLPを2週間で立ち上げた事例",
    slug: "local-seo-lp-case",
    summary: "local-pageのslug設計と再検証フローを先行整備して運用負荷を低減。",
    content_blocks: [
      {
        __component: "blocks.stats-section",
        id: 201,
        heading: "導入後の成果",
        stats: [
          { label: "公開まで", value: "14", suffix: "日" },
          { label: "初月CV", value: "12", suffix: "件" },
        ],
      },
    ],
    seo: {
      meta_title: "地域サービスLPを2週間で立ち上げた事例",
      meta_description: "local-pageを活用した最小実装の導入事例。",
    },
  },
];

const leadMagnets: StrapiRecord[] = [
  {
    id: 21,
    title: "Strapi/Next.js運用チェックリスト",
    slug: "strapi-nextjs-checklist",
    summary: "公開前に確認すべきSEO・relation・導線項目をまとめた資料です。",
    thank_you_heading: "資料ダウンロードありがとうございます",
    thank_you_body: "入力いただいたメールアドレスへダウンロード案内を送信しました。",
    landing_blocks: [
      {
        __component: "blocks.faq-section",
        id: 301,
        heading: "よくある質問",
        items: [{ question: "無料ですか？", answer: "はい。無料で利用できます。" }],
      },
    ],
    seo: {
      meta_title: "Strapi/Next.js運用チェックリスト",
      meta_description: "MVP運用で失敗しないためのチェック項目集。",
    },
  },
];

const localPages: StrapiRecord[] = [
  {
    id: 31,
    title: "東京のWeb制作サービス",
    slug: "tokyo-web-production",
    area: { slug: "tokyo" },
    service: { slug: "web-production" },
    noindex: false,
    canonical_url: "http://localhost:3000/areas/tokyo/web-production",
    content_blocks: [
      {
        __component: "blocks.rich-text",
        id: 401,
        heading: "東京エリアの特性",
        body: "短納期案件が多いため、要件整理テンプレートを使った進行が有効です。",
      },
      {
        __component: "blocks.related-case-studies",
        id: 402,
      },
    ],
    seo: {
      meta_title: "東京のWeb制作サービス",
      meta_description: "東京エリア向けの提供価値と導入事例を紹介。",
    },
  },
];

function buildListResponse(data: StrapiRecord[]): StrapiListResponse<StrapiRecord> {
  return {
    data,
    meta: {
      pagination: {
        page: 1,
        pageSize: data.length,
        pageCount: 1,
        total: data.length,
      },
    },
  };
}

function filterBySlug(data: StrapiRecord[], slug: string | null): StrapiRecord[] {
  if (!slug) return [];
  return data.filter((entry) => entry.slug === slug);
}

export function resolveMockResponse(path: string): StrapiListResponse<StrapiRecord> {
  const url = new URL(path, "http://localhost");
  const slug = url.searchParams.get("filters[slug][$eq]");

  switch (url.pathname) {
    case "/api/blog-posts":
      return buildListResponse(slug ? filterBySlug(blogPosts, slug) : blogPosts);
    case "/api/case-studies":
      return buildListResponse(slug ? filterBySlug(caseStudies, slug) : caseStudies);
    case "/api/lead-magnets":
      return buildListResponse(slug ? filterBySlug(leadMagnets, slug) : leadMagnets);
    case "/api/local-pages":
      return buildListResponse(slug ? filterBySlug(localPages, slug) : localPages);
    default:
      return buildListResponse([]);
  }
}
