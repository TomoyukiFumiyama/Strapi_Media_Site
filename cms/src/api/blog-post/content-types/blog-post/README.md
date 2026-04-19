# blog-post ディレクトリ README

## ディレクトリの役割
`blog-post` content-type の最終スキーマ定義を配置するディレクトリです。

## 配下ファイルと役割
- `schema.json`: `blog-post` の Collection Type スキーマ定義。API 経由で管理するフィールドとリレーションの制約を定義します。主な属性: title, slug, excerpt, cover_image, content_blocks, category, tags, author, related_posts, featured_download, seo, is_featured, reading_time_label。

## 入力ガイド（運用）
### 必須
- `title`, `slug`, `excerpt`
- `content_blocks`（最低1ブロック）
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `cover_image`
- `category`, `tags`, `author`
- `featured_download`

## 公開前チェック
- SEO未設定がないか
- 関連導線（関連投稿 or 資料導線）があるか
- 一覧カードで概要が成立しているか

## 運用メモ
- 詳細運用ルールは `.agents/CONTENT_OPERATIONS.md` を参照してください。
