# Strapi Media Site Scaffold

Version: 0.0.2

Strapi 5 + Next.js App Router を用いたメディアサイトのひな形です。

- CMS: `cms/`
- Frontend: `web/`
- Plan source: `.agent/PLANS.md`

## 使い方

### Web
1. `cd web`
2. `npm install`
3. `npm run dev`

`.env.local` の例:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
REVALIDATE_SECRET=your-secret
STRAPI_USE_MOCK=false
```
