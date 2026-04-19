export const GLOBAL_POPULATE = [
  "populate[default_seo][populate]=og_image",
  "populate[og_default_image]=true",
].join("&");

const BASE_LISTING_FIELDS = ["fields[0]=title", "fields[1]=slug", "fields[2]=is_featured", "populate[cover_image]=true"];

const LISTING_EXCERPT_FIELDS = ["fields[3]=excerpt", "fields[4]=summary"];

export const LISTING_POPULATE_BY_API: Record<string, string> = {
  "blog-posts": [...BASE_LISTING_FIELDS, ...LISTING_EXCERPT_FIELDS].join("&"),
  "case-studies": [...BASE_LISTING_FIELDS, ...LISTING_EXCERPT_FIELDS].join("&"),
  "lead-magnets": [...BASE_LISTING_FIELDS, ...LISTING_EXCERPT_FIELDS].join("&"),
  "local-pages": [
    "fields[0]=title",
    "fields[1]=slug",
    "fields[2]=is_featured",
    "fields[3]=local_intro",
    "populate[area][fields][0]=slug",
    "populate[service][fields][0]=slug",
  ].join("&"),
};

const BASE_DETAIL_POPULATE = [
  "populate[seo][populate]=og_image",
  "populate[cover_image]=true",
  "populate[content_blocks][populate]=*",
  "populate[landing_blocks][populate]=*",
  "populate[featured_download][fields][0]=title",
  "populate[featured_download][fields][1]=slug",
];

export const DETAIL_POPULATE_BY_API: Record<string, string> = {
  "blog-posts": [
    ...BASE_DETAIL_POPULATE,
    "populate[category][fields][0]=name",
    "populate[tags][fields][0]=name",
    "populate[author][fields][0]=name",
  ].join("&"),
  "case-studies": [
    ...BASE_DETAIL_POPULATE,
    "populate[related_services][fields][0]=name",
    "populate[related_areas][fields][0]=name",
  ].join("&"),
  "lead-magnets": [
    ...BASE_DETAIL_POPULATE,
    "populate[related_services][fields][0]=name",
    "populate[related_posts][fields][0]=slug",
    "populate[related_case_studies][fields][0]=slug",
  ].join("&"),
  "local-pages": [
    ...BASE_DETAIL_POPULATE,
    "populate[area][fields][0]=slug",
    "populate[service][fields][0]=slug",
    "populate[local_problem_points][fields][0]=title",
    "populate[local_problem_points][fields][1]=body",
    "populate[local_strengths][fields][0]=title",
    "populate[local_strengths][fields][1]=body",
    "populate[local_faq][fields][0]=question",
    "populate[local_faq][fields][1]=answer",
    "populate[related_case_studies][fields][0]=slug",
    "populate[nearby_office][fields][0]=name",
  ].join("&"),
};
