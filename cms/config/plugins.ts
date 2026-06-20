export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CLOUDFLARE_R2_PUBLIC_URL', undefined),
        s3Options: {
          credentials: {
            accessKeyId: env('CLOUDFLARE_R2_ACCESS_KEY_ID'),
            secretAccessKey: env('CLOUDFLARE_R2_SECRET_ACCESS_KEY'),
          },
          endpoint: env('CLOUDFLARE_R2_ENDPOINT'),
          region: env('CLOUDFLARE_R2_REGION', 'auto'),
          forcePathStyle: true,
          params: {
            Bucket: env('CLOUDFLARE_R2_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
