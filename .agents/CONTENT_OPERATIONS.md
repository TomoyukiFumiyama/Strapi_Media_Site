# CONTENT_OPERATIONS.md

## 目的
主要コンテンツタイプ（blog-post / case-study / local-page / lead-magnet）における入力ルール（必須/推奨）と公開前チェックを標準化し、品質のばらつきを防ぐ。

## 1) blog-post 入力ガイド
### 必須
- `title`: 検索意図が分かる具体的なタイトル
- `slug`: URL と一致する英小文字ケバブケース
- `excerpt`: 一覧カード用の要約（80〜160字目安）
- `content_blocks`: 少なくとも1ブロック
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `cover_image`
- `category`, `tags`, `author`
- `featured_download`

## 2) case-study 入力ガイド
### 必須
- `title`, `slug`, `summary`
- `problem`, `solution`, `result_summary`
- `content_blocks`
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `metrics`, `testimonial`
- `related_services`, `related_areas`
- `featured_download`

## 3) local-page 入力ガイド
### 必須
- `title`, `slug`
- `area`, `service`
- `local_intro`
- `local_problem_points` か `local_strengths` のどちらか1つ以上
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `local_faq`
- `related_case_studies`
- `featured_download`
- `canonical_url` / `noindex` の明示設定

## 4) lead-magnet 入力ガイド
### 必須
- `title`, `slug`, `resource_type`, `summary`
- `gate_enabled`
- `seo.meta_title`, `seo.meta_description`

### 推奨
- `cover_image`
- `download_file` もしくは `external_file_url`
- `form_provider`, `form_id`
- `thank_you_heading`, `thank_you_body`, `thank_you_cta`
- `related_posts`, `related_case_studies`, `related_services`

---

## 公開前チェックリスト（運用手順）

### SEO
- [ ] `meta_title` と `meta_description` が未設定でない
- [ ] canonical が必要なページで設定されている
- [ ] noindex の意図が明確（テスト環境/重複ページのみ）

### Relation
- [ ] 必須 relation（area/service 等）が設定済み
- [ ] blog / case-study / lead-magnet の回遊 relation が最低1本ある

### 画像
- [ ] cover 画像が適切な比率・容量
- [ ] og 画像が設定されている（または global fallback がある）

### 導線
- [ ] 記事末尾や本文中に次アクション（資料DL/事例/問い合わせ）を設置
- [ ] サンクスページ導線が正常

### 公開判定
- [ ] ステージングでページ表示崩れがない
- [ ] 主要ルートの metadata が期待通り
- [ ] 公開後に必要な再検証パスが定義済み
