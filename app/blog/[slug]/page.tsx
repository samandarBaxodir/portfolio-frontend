import { getBlogPost } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const oyNomlari = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const d = new Date(post.created_at);
  const date = `${d.getDate()}-${oyNomlari[d.getMonth()]}, ${d.getFullYear()}`;

  return (
    <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Blogga qaytish
      </Link>
      <p className="text-xs text-muted mb-2">{date}</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">
        {post.title}
      </h1>
      <div className="prose prose-invert max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed">
        {post.content}
      </div>
    </main>
  );
}
