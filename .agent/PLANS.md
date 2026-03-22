# PLANS.md

## 概要
本プロジェクトは、Strapi 5 をCMS、Next.js App Router をフロントエンドとして構築する、ブログ機能付きWebサイトである。

対象となる主要ページは以下の4種類。
1. ブログ記事
2. 導入事例ページ
3. 地域差分ページ（ローカルSEO対策）
4. お役立ち資料ダウンロードページ

このファイルは、実装対象・データ構造・画面構成・API設計・ルーティング方針を定義する。

---

# 1. スコープ

## 1-1. 実装対象
- ブログ記事一覧 / 詳細
- 導入事例一覧 / 詳細
- 地域差分ページ詳細
- 資料一覧 / 詳細 / サンクスページ
- 共通ヘッダー / フッター / SEO
- Strapi 管理画面からのコンテンツ管理
- Strapi REST API からのデータ取得
- Next.js 側でのSEO出力
- 更新時の再検証フロー

## 1-2. 今回のMVP範囲
- 4種類の主要content-type
- 補助マスタcontent-type
- 共通components
- Dynamic Zone による本文/LPブロック構築
- 一覧ページと詳細ページの表示
- metadata生成
- revalidationの基本導線

## 1-3. 今回のMVP範囲外
- 会員機能
- 検索UIの高度化
- A/Bテスト機能
- MAツールとの深い統合
- 複雑な権限制御
- Strapi Custom Field の独自開発
- 多言語対応
- GraphQL導入

---

# 2. 技術構成

## 2-1. CMS
- Strapi 5

## 2-2. フロントエンド
- Next.js App Router
- TypeScript

## 2-3. API
- Strapi REST API

## 2-4. メディア
- 初期は Strapi Media Library を利用
- 将来的に外部ストレージ移行可能な設計にする

---

# 3. 情報設計

## 3-1. 主役content-type
- `blog-post`
- `case-study`
- `local-page`
- `lead-magnet`

## 3-2. 補助content-type
- `author`
- `blog-category`
- `tag`
- `service`
- `area`
- `office`
- `global`（Single Type）

## 3-3. 共通Component
- `shared.seo`
- `shared.hero`
- `shared.cta`
- `shared.kpi-stat`
- `shared.testimonial`
- `shared.faq-item`
- `shared.point-item`
- `shared.social-link`

## 3-4. Dynamic Zone block候補
- `blocks.rich-text`
- `blocks.image-text`
- `blocks.quote`
- `blocks.faq-section`
- `blocks.cta-banner`
- `blocks.stats-section`
- `blocks.related-posts`
- `blocks.related-case-studies`
- `blocks.download-cta`
- `blocks.office-info`

---

# 4. Strapi content-type詳細

## 4-1. blog-post
用途:
- ブログ記事
- SEO記事
- コラム
- 記事下から資料DLへ導線をつなぐ

フィールド:
- `title`: Text, required
- `slug`: UID, required, unique
- `excerpt`: Text
- `cover_image`: Media, single image
- `content_blocks`: Dynamic Zone
- `category`: Relation -> blog-category, many-to-one
- `tags`: Relation -> tag, many-to-many
- `author`: Relation -> author, many-to-one
- `related_posts`: Relation -> blog-post, many-to-many
- `featured_download`: Relation -> lead-magnet, many-to-one
- `seo`: Component -> shared.seo
- `is_featured`: Boolean
- `reading_time_label`: String

補足:
- 記事本文は Rich Text 1本ではなく Dynamic Zone を基本とする
- CTAやFAQを記事に差し込める設計にする
- 関連資料を1件優先表示できるよう `featured_download` を持つ

---

## 4-2. case-study
用途:
- 導入事例
- 制作実績
- 成果事例
- サービス検討者向けの証拠ページ

フィールド:
- `title`: Text, required
- `slug`: UID, required, unique
- `summary`: Text
- `cover_image`: Media
- `client_name`: String
- `client_industry`: String
- `client_region_label`: String
- `problem`: Rich Text
- `solution`: Rich Text
- `result_summary`: Rich Text
- `metrics`: Repeatable Component -> shared.kpi-stat
- `testimonial`: Component -> shared.testimonial
- `gallery`: Media, multiple
- `related_services`: Relation -> service, many-to-many
- `related_areas`: Relation -> area, many-to-many
- `featured_download`: Relation -> lead-magnet, many-to-one
- `content_blocks`: Dynamic Zone
- `seo`: Component -> shared.seo
- `is_featured`: Boolean

補足:
- 「課題」「施策」「成果」を構造化する
- 指標表示のため `metrics` を持つ
- 資料DLやサービス紹介へ接続しやすくする

---

## 4-3. local-page
用途:
- 地域別サービスページ
- ローカルSEOページ
- 「地域名 + サービス名」検索向けページ

フィールド:
- `title`: Text, required
- `slug`: UID, required, unique
- `area`: Relation -> area, many-to-one
- `service`: Relation -> service, many-to-one
- `hero`: Component -> shared.hero
- `local_intro`: Rich Text
- `local_problem_points`: Repeatable Component -> shared.point-item
- `local_strengths`: Repeatable Component -> shared.point-item
- `local_faq`: Repeatable Component -> shared.faq-item
- `nearby_office`: Relation -> office, many-to-one, optional
- `related_case_studies`: Relation -> case-study, many-to-many
- `featured_download`: Relation -> lead-magnet, many-to-one
- `content_blocks`: Dynamic Zone
- `seo`: Component -> shared.seo
- `canonical_url`: String
- `noindex`: Boolean
- `is_featured`: Boolean

補足:
- 地域名だけ差し替えた量産ページにしない
- `area` の情報と `service` の情報を relation で管理する
- FAQ、拠点、導入事例、地域特性を組み合わせて独自性を出す

slug方針:
- `tokyo-aircon-installation`
- `nara-homepage-production`
のように `areaSlug-serviceSlug` を基本とする

---

## 4-4. lead-magnet
用途:
- お役立ち資料
- ホワイトペーパー
- 比較表
- チェックリスト
- テンプレート

フィールド:
- `title`: Text, required
- `slug`: UID, required, unique
- `resource_type`: Enumeration
  - `whitepaper`
  - `checklist`
  - `template`
  - `casebook`
- `summary`: Text
- `cover_image`: Media
- `download_file`: Media, single file
- `external_file_url`: String
- `gate_enabled`: Boolean
- `form_provider`: Enumeration
  - `internal`
  - `hubspot`
  - `none`
- `form_id`: String
- `thank_you_heading`: String
- `thank_you_body`: Rich Text
- `thank_you_cta`: Component -> shared.cta
- `related_services`: Relation -> service, many-to-many
- `related_posts`: Relation -> blog-post, many-to-many
- `related_case_studies`: Relation -> case-study, many-to-many
- `landing_blocks`: Dynamic Zone
- `seo`: Component -> shared.seo
- `is_featured`: Boolean

補足:
- ファイル本体とフォーム設定を分離する
- 外部フォームツール導入を見越す
- サンクスページ用の見出しと本文を持たせる

---

# 5. 補助content-type詳細

## 5-1. author
フィールド:
- `name`: String
- `slug`: UID
- `role_label`: String
- `bio`: Rich Text
- `avatar`: Media
- `social_links`: Repeatable Component -> shared.social-link

用途:
- 記事著者表示
- 専門家監修表示
- 著者一覧への拡張余地

---

## 5-2. blog-category
フィールド:
- `name`: String
- `slug`: UID
- `description`: Text

用途:
- ブログカテゴリ分類
- カテゴリ一覧/カテゴリページの元データ

---

## 5-3. tag
フィールド:
- `name`: String
- `slug`: UID

用途:
- 横断タグ管理

---

## 5-4. service
フィールド:
- `name`: String
- `slug`: UID
- `short_description`: Text
- `icon`: Media
- `overview`: Rich Text

用途:
- 導入事例
- 地域差分ページ
- 資料DLページ
- 将来のサービス詳細ページへの展開

---

## 5-5. area
フィールド:
- `name`: String
- `slug`: UID
- `prefecture`: String
- `city`: String
- `area_summary`: Rich Text
- `landmarks`: Repeatable Component -> shared.point-item

用途:
- 地域差分ページの共通地域情報
- エリア固有要素の格納

---

## 5-6. office
フィールド:
- `name`: String
- `slug`: UID
- `address`: Text
- `tel`: String
- `business_hours`: String
- `map_embed_url`: String
- `service_areas`: Relation -> area, many-to-many

用途:
- 近隣拠点の表示
- ローカルSEOページでの信頼補強

---

## 5-7. global（Single Type）
フィールド:
- `site_name`: String
- `default_seo`: Component -> shared.seo
- `header_cta`: Component -> shared.cta
- `footer_cta`: Component -> shared.cta
- `company_name`: String
- `company_address`: Text
- `company_tel`: String
- `og_default_image`: Media

用途:
- サイト共通設定
- デフォルトSEO
- ヘッダー/フッター共通情報

---

# 6. Component詳細

## 6-1. shared.seo
- `meta_title`: String
- `meta_description`: Text
- `og_image`: Media
- `canonical_url`: String
- `noindex`: Boolean

用途:
- metadata生成の元情報

---

## 6-2. shared.hero
- `eyebrow`: String
- `heading`: String
- `lead`: Text
- `background_image`: Media
- `primary_cta`: Component -> shared.cta
- `secondary_cta`: Component -> shared.cta

用途:
- ページ上部の訴求セクション

---

## 6-3. shared.cta
- `label`: String
- `url`: String
- `style`: Enumeration
  - `primary`
  - `secondary`
  - `text`

用途:
- ボタンやテキストCTAの共通化

---

## 6-4. shared.kpi-stat
- `label`: String
- `value`: String
- `suffix`: String
- `note`: String

用途:
- 成果指標の表示

---

## 6-5. shared.testimonial
- `quote`: Rich Text
- `speaker_name`: String
- `speaker_meta`: String

用途:
- 導入事例内の声・コメント表示

---

## 6-6. shared.faq-item
- `question`: String
- `answer`: Rich Text

用途:
- FAQ項目

---

## 6-7. shared.point-item
- `title`: String
- `body`: Text

用途:
- 箇条書き要素
- 強み
- 地域特性
- 課題ポイント

---

## 6-8. shared.social-link
- `label`: String
- `url`: String

用途:
- 著者プロフィール等の外部リンク

---

# 7. Dynamic Zone block詳細

## 7-1. blocks.rich-text
想定用途:
- 汎用本文

主なフィールド例:
- `heading`
- `body`

---

## 7-2. blocks.image-text
想定用途:
- 画像+説明
- サービス説明
- 資料説明

主なフィールド例:
- `heading`
- `body`
- `image`
- `image_position`

---

## 7-3. blocks.quote
想定用途:
- 引用
- メッセージ表示

主なフィールド例:
- `quote`
- `author_name`

---

## 7-4. blocks.faq-section
想定用途:
- FAQセクションのまとまり

主なフィールド例:
- `heading`
- `items`（Repeatable -> shared.faq-item）

---

## 7-5. blocks.cta-banner
想定用途:
- ページ途中のCTA

主なフィールド例:
- `heading`
- `body`
- `cta`

---

## 7-6. blocks.stats-section
想定用途:
- 実績・指標表示

主なフィールド例:
- `heading`
- `stats`（Repeatable -> shared.kpi-stat）

---

## 7-7. blocks.related-posts
想定用途:
- 関連記事導線

---

## 7-8. blocks.related-case-studies
想定用途:
- 関連事例導線

---

## 7-9. blocks.download-cta
想定用途:
- 資料ダウンロード誘導

主なフィールド例:
- `heading`
- `body`
- `lead_magnet` relation

---

## 7-10. blocks.office-info
想定用途:
- 拠点情報表示

主なフィールド例:
- `heading`
- `office` relation

---

# 8. Strapiディレクトリ構成

```text
cms/
└─ src/
   ├─ api/
   │  ├─ blog-post/
   │  │  └─ content-types/
   │  │     └─ blog-post/
   │  │        └─ schema.json
   │  ├─ case-study/
   │  │  └─ content-types/
   │  │     └─ case-study/
   │  │        └─ schema.json
   │  ├─ local-page/
   │  │  └─ content-types/
   │  │     └─ local-page/
   │  │        └─ schema.json
   │  ├─ lead-magnet/
   │  │  └─ content-types/
   │  │     └─ lead-magnet/
   │  │        └─ schema.json
   │  ├─ author/
   │  ├─ blog-category/
   │  ├─ tag/
   │  ├─ service/
   │  ├─ area/
   │  ├─ office/
   │  └─ global/
   └─ components/
      ├─ shared/
      │  ├─ seo.json
      │  ├─ hero.json
      │  ├─ cta.json
      │  ├─ kpi-stat.json
      │  ├─ testimonial.json
      │  ├─ faq-item.json
      │  ├─ point-item.json
      │  └─ social-link.json
      └─ blocks/
         ├─ rich-text.json
         ├─ image-text.json
         ├─ quote.json
         ├─ faq-section.json
         ├─ cta-banner.json
         ├─ stats-section.json
         ├─ related-posts.json
         ├─ related-case-studies.json
         ├─ download-cta.json
         └─ office-info.json

# 9. Next.jsディレクトリ構成
web/
└─ src/
   ├─ app/
   │  ├─ (site)/
   │  │  ├─ layout.tsx
   │  │  ├─ page.tsx
   │  │  ├─ blog/
   │  │  │  ├─ page.tsx
   │  │  │  └─ [slug]/
   │  │  │     └─ page.tsx
   │  │  ├─ case-studies/
   │  │  │  ├─ page.tsx
   │  │  │  └─ [slug]/
   │  │  │     └─ page.tsx
   │  │  ├─ areas/
   │  │  │  └─ [areaSlug]/
   │  │  │     └─ [serviceSlug]/
   │  │  │        └─ page.tsx
   │  │  ├─ resources/
   │  │  │  ├─ page.tsx
   │  │  │  └─ [slug]/
   │  │  │     ├─ page.tsx
   │  │  │     └─ thanks/
   │  │  │        └─ page.tsx
   │  │  ├─ contact/
   │  │  │  └─ page.tsx
   │  │  └─ sitemap.ts
   │  └─ api/
   │     ├─ revalidate/
   │     │  └─ route.ts
   │     └─ download/
   │        └─ route.ts
   ├─ components/
   │  ├─ templates/
   │  │  ├─ blog-post-template.tsx
   │  │  ├─ case-study-template.tsx
   │  │  ├─ local-page-template.tsx
   │  │  └─ lead-magnet-template.tsx
   │  ├─ blocks/
   │  │  ├─ strapi-block-renderer.tsx
   │  │  ├─ rich-text-block.tsx
   │  │  ├─ image-text-block.tsx
   │  │  ├─ faq-section-block.tsx
   │  │  ├─ cta-banner-block.tsx
   │  │  ├─ stats-section-block.tsx
   │  │  ├─ related-posts-block.tsx
   │  │  ├─ related-case-studies-block.tsx
   │  │  ├─ download-cta-block.tsx
   │  │  └─ office-info-block.tsx
   │  ├─ sections/
   │  │  ├─ blog-card-grid.tsx
   │  │  ├─ case-study-card-grid.tsx
   │  │  ├─ local-page-hero.tsx
   │  │  └─ download-form.tsx
   │  └─ ui/
   ├─ features/
   │  ├─ blog/
   │  ├─ case-studies/
   │  ├─ local-pages/
   │  └─ lead-magnets/
   ├─ lib/
   │  ├─ strapi/
   │  │  ├─ client.ts
   │  │  ├─ queries.ts
   │  │  ├─ populate.ts
   │  │  ├─ mappers.ts
   │  │  └─ metadata.ts
   │  ├─ seo/
   │  │  └─ build-metadata.ts
   │  └─ utils/
   └─ types/
      ├─ strapi.ts
      ├─ blocks.ts
      └─ page-models.ts

10. ルーティング仕様
10-1. ブログ
/blog
/blog/[slug]

対応:

一覧: blog-post
詳細: blog-post
10-2. 導入事例
/case-studies
/case-studies/[slug]

対応:

一覧: case-study
詳細: case-study
10-3. 地域差分ページ
/areas/[areaSlug]/[serviceSlug]

対応:

詳細: local-page

取得方針:

areaSlug と serviceSlug を結合し、local-page.slug と一致させる
例:
URL: /areas/tokyo/aircon-installation
slug: tokyo-aircon-installation
10-4. 資料ダウンロード
/resources
/resources/[slug]
/resources/[slug]/thanks

対応:

一覧: lead-magnet
詳細: lead-magnet
サンクス: lead-magnet の情報を利用
11. API取得方針
11-1. 基本方針
Strapi REST API を利用する
一覧用と詳細用でクエリを分ける
populate=* の乱用を避ける
mapper を挟んでUI用型へ変換する
11-2. 想定エンドポイント例
blog-post 詳細
/api/blog-posts?filters[slug][$eq]={slug}&populate=*
case-study 詳細
/api/case-studies?filters[slug][$eq]={slug}&populate=*
local-page 詳細
/api/local-pages?filters[slug][$eq]={slug}&populate=*
lead-magnet 詳細
/api/lead-magnets?filters[slug][$eq]={slug}&populate=*
11-3. 一覧系取得の考え方

一覧では以下のみ優先取得する。

title
slug
excerpt / summary
cover_image
category or related label
featured flag

詳細ページのみ以下を取得する。

content_blocks
relations
gallery
faq
testimonial
download関連情報
12. 表示テンプレート責務
12-1. blog-post-template

責務:

記事ヘッダー
カテゴリ/著者/投稿日表示
Dynamic Zone 本文表示
関連記事導線
資料ダウンロード導線
12-2. case-study-template

責務:

事例概要
課題/施策/成果
KPI表示
お客様の声
関連サービス
関連資料導線
12-3. local-page-template

責務:

地域×サービスの主訴求
地域特性表示
強み
FAQ
関連事例
近隣拠点
資料導線
12-4. lead-magnet-template

責務:

資料概要
フォーム表示
フォーム送信後導線
関連記事/事例表示
trust要素表示
13. SEO方針
13-1. metadataの優先順位
各ページの seo.meta_title
各ページの title
global.default_seo.meta_title

description も同様に優先順位を定める。

13-2. canonical
seo.canonical_url があれば優先
local-page は重複を避けるため明示的に管理可能にする
13-3. noindex
seo.noindex または local-page.noindex を反映する
13-4. OGP
各ページ seo.og_image
なければ cover_image
それもなければ global.og_default_image
14. 再検証方針
14-1. 目的

Strapi 側で公開・更新された内容を Next.js 側に反映する。

14-2. 基本フロー
Strapi で publish / update
Webhook または明示APIで Next.js の再検証エンドポイントを呼ぶ
該当ルートのみ再検証する
14-3. 再検証対象の例
blog-post 更新時
/blog
/blog/[slug]
case-study 更新時
/case-studies
/case-studies/[slug]
local-page 更新時
該当 /areas/[areaSlug]/[serviceSlug]
lead-magnet 更新時
/resources
/resources/[slug]
必要に応じて関連記事/事例詳細
15. 環境変数想定
15-1. Frontend
STRAPI_URL
STRAPI_API_TOKEN
NEXT_PUBLIC_SITE_URL
REVALIDATE_SECRET
15-2. CMS
Strapi 標準の app key / api token / database系設定
Media provider を使う場合はその資格情報

注意:

秘密情報をクライアントへ渡さない
NEXT_PUBLIC_* と server-only 変数を明確に分ける
16. 実装順序
Phase 1: モデル定義
shared component 作成
補助content-type作成
4つの主要content-type作成
Phase 2: フロント骨組み
ルーティング作成
layout 作成
template 雛形作成
Phase 3: API接続
Strapi client 実装
query builder 実装
mapper 実装
Phase 4: 表示部品
block renderer 実装
一覧カード実装
詳細テンプレート実装
Phase 5: SEOと運用
metadata 実装
sitemap 実装
revalidation 実装
Phase 6: 品質担保
nullケース確認
relation未設定ケース確認
slug / 404 / metadata テスト
ローカルSEOページの重複・薄い内容チェック
17. 受け入れ条件
17-1. CMS
Strapi で4種類のコンテンツを作成できる
relation と media が管理画面で扱える
Dynamic Zone で本文ブロックを追加できる
17-2. Frontend
各ルートが表示できる
該当slugで詳細表示できる
0件時は404になる
metadata が正しく出力される
17-3. 運用
ブログから資料導線が出せる
地域差分ページから事例・資料へ接続できる
Strapi 更新後に再検証できる
17-4. 品質
命名規則が統一されている
重複フィールドが乱立していない
一覧取得と詳細取得が分離されている
mapper でUI型に変換されている
18. 将来拡張メモ
著者一覧ページ
タグ一覧ページ
サービス詳細ページ
エリア一覧ページ
比較記事テンプレート
フォーム送信の内部DB保存
HubSpot等の外部マーケティング連携
多言語対応
検索ページ
パーソナライズCTA

以上を見越しつつ、MVPでは構造を複雑にしすぎないこと。
