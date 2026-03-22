import { BlogCardGrid } from "@/components/sections/blog-card-grid";
import { fetchBlogList } from "@/features/blog";

export default async function BlogListPage() {
  const blogPosts = await fetchBlogList();
  return (
    <main>
      <h1>ブログ一覧</h1>
      <BlogCardGrid items={blogPosts} />
    </main>
  );
}
