import { getBlogPosts } from "@/lib/api";
import { BlogCard } from "@/components/blog-card";
import type { BlogPost } from "@/lib/types";

export default async function BlogPage() {
  const posts: BlogPost[] = await getBlogPosts();

  return (
    <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-muted">Hozircha postlar yo'q.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}