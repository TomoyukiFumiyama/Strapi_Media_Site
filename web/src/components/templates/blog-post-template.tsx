import { StrapiBlockRenderer } from "@/components/blocks/strapi-block-renderer";
import type { BlogPostModel } from "@/types/page-models";

export function BlogPostTemplate({ blogPost }: { blogPost: BlogPostModel }) {
  return (
    <main>
      <h1>{blogPost.title}</h1>
      {blogPost.excerpt ? <p>{blogPost.excerpt}</p> : null}
      <StrapiBlockRenderer blocks={blogPost.blocks} />
    </main>
  );
}
