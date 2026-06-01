// StrapiのHTTPサーバー設定を環境変数から組み立て、Docker/Node.js双方で同じ値を利用できるようにします。
export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
});
