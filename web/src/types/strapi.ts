export type StrapiEntity<T extends Record<string, unknown>> = {
  id: number;
  documentId?: string;
  attributes?: T;
} & T;

export type StrapiListResponse<T extends Record<string, unknown>> = {
  data: Array<StrapiEntity<T>>;
  meta?: Record<string, unknown>;
};

export type StrapiSingleResponse<T extends Record<string, unknown>> = {
  data: StrapiEntity<T>;
  meta?: Record<string, unknown>;
};

export type StrapiMedia = {
  url?: string;
  alternativeText?: string;
};

export type StrapiSeo = {
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  noindex?: boolean;
  og_image?: {
    url?: string;
    data?: { attributes?: { url?: string } };
  };
};
