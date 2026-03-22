import type { StrapiListResponse } from "@/types/strapi";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const SHOULD_USE_MOCK = process.env.STRAPI_USE_MOCK === "true";

const MOCK_RESPONSE: StrapiListResponse<Record<string, unknown>> = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } },
};

export async function fetchStrapi<T>(path: string): Promise<T> {
  if (SHOULD_USE_MOCK) {
    return MOCK_RESPONSE as T;
  }

  const requestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_API_TOKEN ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` } : {}),
    },
    next: { revalidate: 60 },
  } as RequestInit;

  const response = await fetch(`${STRAPI_URL}${path}`, requestInit);

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
