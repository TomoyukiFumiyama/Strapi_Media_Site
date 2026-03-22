# AGENTS.md

## 目的
このリポジトリは、Strapi 5 をヘッドレスCMS、Next.js App Router をフロントエンドとして構築する、ブログ機能付きWebサイトの開発を目的とする。

対象コンテンツは以下の4種類。
1. ブログ記事
2. 導入事例ページ
3. 地域差分ページ（ローカルSEO対策）
4. お役立ち資料ダウンロードページ

このファイルは、実装時の判断基準・命名規則・責務分離・品質基準を定義する。

---

## 開発原則

### 1. 役割分担を厳守する
- Strapi は「コンテンツ構造」と「管理画面」と「API配信」を担当する
- Next.js は「表示」と「ルーティング」と「SEO出力」を担当する
- 表示用の都合で Strapi 側にロジックを寄せすぎない
- CMSの都合で Next.js 側にデータ構造を埋め込まない

### 2. 単一責任の原則を守る
- 1ファイル1責務を原則とする
- テンプレート、UI部品、API取得、データ整形、SEO生成を分離する
- 長い関数、長いコンポーネント、長い条件分岐を放置しない

### 3. まず共通化、ただし早すぎる抽象化は避ける
- 明らかに再利用されるものだけを Component / utility に切り出す
- ブロック系UIは共通化する
- 4種類すべてに共通しない要素は無理に共通化しない

### 4. データ主導で設計する
- ページの見た目より先に、Strapi の content-type / component / relation を整理する
- pageごとの一時しのぎのif分岐で凌がない
- 「この項目はどの型に属するべきか」を先に考える

### 5. カスタムフィールドは最後の手段
- まずは標準フィールド、Component、Dynamic Zone で解決する
- Strapi Custom Field は、本当に管理UIが必要な場合のみ導入する
- 独自管理UIを増やしすぎて保守不能にしない

### 6. feature-first を最優先
機能単位で完結させ、変更影響範囲を最小化する。 

---

## 技術スタック前提
- CMS: Strapi 5
- Frontend: Next.js App Router
- Language: TypeScript
- Styling: 任意。ただしプロジェクト内で統一する
- Runtime: Node.js LTS
- API: Strapi REST API
- Revalidation: Next.js の revalidatePath または関連手段を利用
- Media: Strapi Media Library を基本とし、必要に応じて外部ストレージへ移行可能な設計にする

---

## ディレクトリ方針

### Strapi
- `src/api/*` に content-type を置く
- `src/components/shared/*` に共通Componentを置く
- `src/components/blocks/*` に Dynamic Zone 用の表示部品単位Component定義を置く

### Next.js
- `src/app/*` にルーティングを置く
- `src/components/templates/*` にページ単位テンプレートを置く
- `src/components/blocks/*` に Strapi の Dynamic Zone を描画するUIを置く
- `src/features/*` にドメイン単位の取得・整形・表示補助を置く
- `src/lib/strapi/*` に API クライアント、query builder、mapper を置く
- `src/types/*` に型定義を置く

---

## 命名規則

### 全体
- 小文字ケバブケースを基本とする
- 名前は役割が分かる具体名にする
- 省略語を乱用しない
- `data`, `item`, `info` のような曖昧名を避ける

### Strapi content-type
- 例: `blog-post`, `case-study`, `local-page`, `lead-magnet`
- API名と内容が一致するようにする

### Strapi component
- `shared.seo`
- `shared.hero`
- `shared.cta`
- `blocks.rich-text`
- `blocks.faq-section`

### Next.js component file
- `blog-post-template.tsx`
- `case-study-template.tsx`
- `strapi-block-renderer.tsx`

### 変数名
- 真偽値は `is*`, `has*`, `should*`
- 配列は複数形にする
- URL文字列は `url`
- slug文字列は `slug`
- relation元/先が分かるように `relatedPosts`, `featuredDownload` など具体化する

---

## Strapi設計ルール

### 1. content-typeの責務
- `blog-post`: 記事本文と記事メタ情報を持つ
- `case-study`: 実績・成果・導入背景を持つ
- `local-page`: 地域差分コンテンツを持つ
- `lead-magnet`: 資料ダウンロード情報を持つ
- `service`, `area`, `author`, `blog-category`, `tag` は補助マスタとする

### 2. Componentの使い方
- 再利用される入力群は Component にする
- ページ内のセクション並び替えが必要なら Dynamic Zone に入れる
- SEO、CTA、FAQ、Hero、KPI は Component を優先する

### 3. Dynamic Zoneの使い方
- 本文を完全に自由入力にしすぎない
- 表示責務が明確な block だけを許可する
- 同一の意味を持つ block を重複定義しない

### 4. relationの使い方
- 表示のためにテキストを重複コピーしない
- 地域名は `area` relation を優先する
- サービス名は `service` relation を優先する
- 資料導線は `featured_download` または関連relationで紐づける

### 5. slugの扱い
- すべての公開ページ系 content-type に slug を持たせる
- slug は表示URLと一致させる
- slug の命名規則を途中で変えない
- local-page は `areaSlug-serviceSlug` など、フロントで一貫して組み立てられる形式に統一する

---

## Next.js設計ルール

### 1. ページは薄く保つ
- `page.tsx` には取得とテンプレート呼び出し以上の責務を持たせない
- 重い整形処理は `features/*` または `lib/*` に逃がす

### 2. テンプレートとブロックを分離する
- テンプレートはページ全体の骨組みだけ持つ
- Dynamic Zone の描画分岐は `strapi-block-renderer.tsx` に集約する
- 各 block UI は独立ファイルに切り出す

### 3. SEO情報は一元管理する
- metadata 生成は共通関数に集約する
- title / description / canonical / og image の解決順序を固定する
- ページごとの独自実装を増やさない

### 4. データ取得を共通化する
- fetch直書きを各所に散らさない
- Strapi API呼び出しは client / query / mapper にまとめる
- `populate` の組み立てを毎回ベタ書きしない

### 5. 例外処理を明確にする
- 0件取得時は `notFound()` を使う
- API失敗時の表示方針を決める
- silent fail を避ける

---

## API実装ルール

### 1. REST APIを前提にする
- 初期段階では REST API を採用する
- GraphQL は必要性が明確になるまで導入しない

### 2. populateの管理を統一する
- relations / media / components / dynamic zones は必ず `populate` を意識する
- `populate=*` を無制限に多用しない
- 一覧ページ用と詳細ページ用で query を分ける

### 3. mapperを挟む
- Strapi のレスポンス形状をそのままUIに流さない
- UI側ではアプリケーション都合の型に変換したものだけを扱う
- null安全性を mapper で吸収する

### 4. キャッシュと再生成
- 一覧ページと詳細ページの再検証単位を分ける
- Strapi の publish / unpublish 更新時に Next.js 側の該当パスを再検証できるようにする
- 不必要に全体再ビルドしない

---

## ローカルSEOページのルール
- 地域差分ページは単なる地名置換ページにしない
- `area` ごとの固有情報を持たせる
- `service` ごとの固有価値を持たせる
- FAQ、導入事例、近隣拠点、エリア特性の少なくとも一部を組み合わせる
- canonical / noindex の判断を SEO設計に従って管理する

---

## お役立ち資料ダウンロードページのルール
- 資料情報とフォーム情報を分離する
- ファイルURL直書きだけに依存しない
- ダウンロード後のサンクスページを用意する
- ブログや導入事例から資料導線を貼れるよう relation を持たせる
- フォーム外部連携を見越して `form_provider`, `form_id` を保持する

---

## セキュリティルール
- 環境変数をハードコードしない
- APIトークンをソースコードに埋め込まない
- Private API と Public API の責務を分ける
- フロントから秘匿トークンを露出しない
- フォーム送信系はバリデーションを必ず実装する
- サニタイズを怠らない
- 外部URL出力時は安全性を確認する
- Mediaやリッチテキストの埋め込みを無条件で信用しない

---

## パフォーマンスルール
- 一覧用クエリは最小項目だけ取得する
- 詳細ページでのみ重い relation / block を取得する
- 大きい画像は最適化前提で扱う
- 不要なクライアントコンポーネント化を避ける
- 静的化できるページは可能な限り静的化する

---

## テストルール
- 重要な mapper はユニットテスト対象にする
- ルーティングごとの主要分岐は最低限テストする
- Strapi レスポンスに null / relation未設定が来た時の挙動を確認する
- local-page の slug 組み立てロジックは必ずテストする
- metadata 生成処理は崩れやすいためテスト対象とする

---

## 実装時の禁止事項
- 1つの `page.tsx` に取得・整形・描画・SEOロジックを全部詰め込むこと
- 同じ意味の field を別content-type に乱立させること
- pageごとに異なる独自ルールを増やし続けること
- `populate=*` 依存で構造把握を放棄すること
- 一時対応のif分岐を放置して仕様化しないこと
- 共通化できる block UI をコピペで量産すること

---

## 推奨実装順
1. shared component を作る
2. 補助マスタ content-type を作る
3. 4つの主役 content-type を作る
4. Next.js の route を作る
5. Strapi client / query / mapper を整備する
6. template と block renderer を作る
7. metadata と revalidation を実装する
8. テストを追加する

---

## Definition of Done
- Strapi 側で対象content-typeが作成されている
- Next.js 側で一覧・詳細ページが表示できる
- metadata が出力される
- relation / media / block の未設定時に崩れない
- slug が仕様通りに動作する
- 型エラーがない
- 主要関数に最低限のテストがある
- 命名・責務分離・セキュリティ要件を満たす

---

## 判断に迷ったとき
以下の優先順位で判断する。
1. 保守性
2. データ構造の一貫性
3. SEO・運用要件
4. 実装速度
5. 一時的な見た目都合

一時的に速いが後で壊れやすい実装は採用しない。

## PLANS.md運用ルール
- `PLANS.md` には「これから行う作業計画（マイルストーン）」のみを記載する。
- 完了したタスクは `PLANS.md` から削除し、履歴は `CHANGELOG.md` に記録する。
- `PLANS.md` は常に最新の未完了計画だけが残る状態を維持する。

## プロジェクト固有ルール
バージョン管理（必須）
- メインファイルの Version: を、機能追加・修正のたびに必ず +0.0.1 でインクリメントする。
- バージョンは Semantic Versioning に準拠する（例：1.2.4 → 1.2.5）。

バージョン履歴（開発履歴）は CHANGELOG.md に記述する
- 例：
- 1.2.5 – 開発した機能の概要がわかるタイトル
- - 機能概要
- - 導入方法 / 設定項目
- - 使用上の注意点
