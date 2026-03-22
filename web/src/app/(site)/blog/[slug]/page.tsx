import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostTemplate } from "@/components/templates/blog-post-template";
import { fetchBlogPostBySlug } from "@/features/blog";
import { resolvePageMetadata } from "@/lib/strapi/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await fetchBlogPostBySlug(slug);

  if (!blogPost) {
    return resolvePageMetadata({ fallbackTitle: "Blog" });
  }

  return resolvePageMetadata({
    pageSeo: {
      meta_title: blogPost.seo.title,
      meta_description: blogPost.seo.description,
      canonical_url: blogPost.seo.canonicalUrl,
      noindex: blogPost.seo.noindex,
    },
    fallbackTitle: blogPost.title,
    fallbackDescription: blogPost.excerpt,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogPost = await fetchBlogPostBySlug(slug);

  if (!blogPost) {
    notFound();
  }

  const resolvedBlogPost = blogPost;
  return <BlogPostTemplate blogPost={resolvedBlogPost} />;
}
