export type RichTextBlock = {
  __component: "blocks.rich-text";
  id?: number;
  heading?: string;
  body?: string;
};

export type ImageTextBlock = {
  __component: "blocks.image-text";
  id?: number;
  heading?: string;
  body?: string;
  image_position?: "left" | "right";
  image?: { url?: string; alternativeText?: string };
};

export type FaqItem = { question?: string; answer?: string };

export type FaqSectionBlock = {
  __component: "blocks.faq-section";
  id?: number;
  heading?: string;
  items?: FaqItem[];
};

export type CtaBannerBlock = {
  __component: "blocks.cta-banner";
  id?: number;
  heading?: string;
  body?: string;
  cta?: { label?: string; url?: string };
};

export type StatsSectionBlock = {
  __component: "blocks.stats-section";
  id?: number;
  heading?: string;
  stats?: Array<{ label?: string; value?: string; suffix?: string }>;
};

export type DownloadCtaBlock = {
  __component: "blocks.download-cta";
  id?: number;
  heading?: string;
  body?: string;
};

export type OfficeInfoBlock = {
  __component: "blocks.office-info";
  id?: number;
  heading?: string;
};

export type GenericBlock = {
  __component: string;
  id?: number;
  [key: string]: unknown;
};

export type StrapiBlock =
  | RichTextBlock
  | ImageTextBlock
  | FaqSectionBlock
  | CtaBannerBlock
  | StatsSectionBlock
  | DownloadCtaBlock
  | OfficeInfoBlock
  | GenericBlock;
