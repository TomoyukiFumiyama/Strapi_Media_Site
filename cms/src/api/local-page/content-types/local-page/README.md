# local-page ディレクトリ README

## ディレクトリの役割
`local-page` content-type の最終スキーマ定義を配置するディレクトリです。

## 配下ファイルと役割
- `schema.json`: `local-page` の Collection Type スキーマ定義。API 経由で管理するフィールドとリレーションの制約を定義します。主な属性: title, slug, area, service, hero, local_intro, local_problem_points, local_strengths, local_faq, nearby_office, related_case_studies, featured_download, content_blocks, seo, canonical_url, noindex, is_featured。

## 入力ガイド（運用）
### 必須
- `title`, `slug`
- `area`, `service`
- `local_intro`
- `local_problem_points` または `local_strengths` のどちらか
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `local_faq`
- `related_case_studies`
- `featured_download`
- `canonical_url`, `noindex`

## 公開前チェック
- 単純な地名差し替えになっていないか
- 地域固有の課題/価値/FAQのいずれかが明記されているか
- 導入事例か資料の導線があるか

## 運用メモ
- 詳細運用ルールは `.agents/CONTENT_OPERATIONS.md` を参照してください。
