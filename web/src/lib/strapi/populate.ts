export const GLOBAL_POPULATE = [
  "populate[default_seo][populate]=og_image",
  "populate[og_default_image]=true",
].join("&");

export const LISTING_POPULATE = [
  "fields[0]=title",
  "fields[1]=slug",
  "fields[2]=excerpt",
  "fields[3]=summary",
  "fields[4]=is_featured",
  "populate[cover_image]=true",
].join("&");

export const DETAIL_POPULATE = [
  "populate[seo][populate]=og_image",
  "populate[cover_image]=true",
  "populate[content_blocks][populate]=*",
  "populate[landing_blocks][populate]=*",
  "populate[featured_download][fields][0]=title",
  "populate[featured_download][fields][1]=slug",
].join("&");
