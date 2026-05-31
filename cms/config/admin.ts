// 管理画面とAPI tokenの署名用secretを環境変数に閉じ込め、ソースコードへの秘匿値埋め込みを防ぎます。
export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
});
