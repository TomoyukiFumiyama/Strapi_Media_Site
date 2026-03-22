import Link from "next/link";

const quickLinks = [
  { href: "/blog", label: "ブログ一覧" },
  { href: "/blog/start-strapi-nextjs-blog", label: "ブログ詳細（サンプル）" },
  { href: "/case-studies", label: "導入事例一覧" },
  { href: "/case-studies/local-seo-lp-case", label: "導入事例詳細（サンプル）" },
  { href: "/resources", label: "資料一覧" },
  { href: "/resources/strapi-nextjs-checklist", label: "資料詳細（サンプル）" },
  { href: "/resources/strapi-nextjs-checklist/thanks", label: "サンクスページ（サンプル）" },
  { href: "/areas/tokyo/web-production", label: "地域差分ページ（サンプル）" },
];

export default function HomePage() {
  return (
    <main>
      <h1>Strapi Media Site（MVP）</h1>
      <p>`.env.local` で `STRAPI_USE_MOCK=true` を設定すると、モックデータで全ルートを確認できます。</p>
      <ul>
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
