# case-study ディレクトリ README

## ディレクトリの役割
`case-study` content-type の最終スキーマ定義を配置するディレクトリです。

## 配下ファイルと役割
- `schema.json`: `case-study` の Collection Type スキーマ定義。API 経由で管理するフィールドとリレーションの制約を定義します。主な属性: title, slug, summary, cover_image, problem, solution, result_summary, metrics, testimonial, gallery, related_services, related_areas, featured_download, content_blocks, seo, is_featured。

## 入力ガイド（運用）
### 必須
- `title`, `slug`, `summary`
- `problem`, `solution`, `result_summary`
- `content_blocks`
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `metrics`, `testimonial`
- `related_services`, `related_areas`
- `featured_download`

## 公開前チェック
- 成果が数値または定性的に記述されているか
- 導入背景・解決策・成果の流れが成立しているか
- 資料/問い合わせ導線が設定されているか

## 運用メモ
- 詳細運用ルールは `.agents/CONTENT_OPERATIONS.md` を参照してください。
