# shared ディレクトリ README

## ディレクトリの役割
複数 content-type から使い回す共通 component 定義です。

## 配下ファイルと役割
- `cta.json`: `CTA` component 定義。入力 UI と JSON 構造を規定し、主な属性は label, url, style です。
- `faq-item.json`: `FAQ Item` component 定義。入力 UI と JSON 構造を規定し、主な属性は question, answer です。
- `hero.json`: `Hero` component 定義。入力 UI と JSON 構造を規定し、主な属性は eyebrow, heading, lead, background_image, primary_cta, secondary_cta です。
- `kpi-stat.json`: `KPI Stat` component 定義。入力 UI と JSON 構造を規定し、主な属性は label, value, suffix, note です。
- `point-item.json`: `Point Item` component 定義。入力 UI と JSON 構造を規定し、主な属性は title, body です。
- `seo.json`: `SEO` component 定義。入力 UI と JSON 構造を規定し、主な属性は meta_title, meta_description, og_image, canonical_url, noindex です。
- `social-link.json`: `Social Link` component 定義。入力 UI と JSON 構造を規定し、主な属性は label, url です。
- `testimonial.json`: `Testimonial` component 定義。入力 UI と JSON 構造を規定し、主な属性は quote, speaker_name, speaker_meta です。

## 運用メモ
- 新しいファイルを追加したら、この README の「配下ファイルと役割」を更新してください。
