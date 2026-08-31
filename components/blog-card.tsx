"use client";

import { TiltCard } from "./tilt-card";
import type { BlogPost } from "@/lib/types";

const oyNomlari = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];

export function BlogCard({ post }: { post: BlogPost }) {
  const d = new Date(post.created_at);
  const date = `${d.getDate()}-${oyNomlari[d.getMonth()]}, ${d.getFullYear()}`;

  return (
    <TiltCard href={`/blog/${post.slug}`} className="p-6">
      <p className="text-xs text-muted mb-2">{date}</p>
      <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
      {post.tags && (
        <div className="flex flex-wrap gap-2">
          {post.tags.split(",").map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      )}
    </TiltCard>
  );
}
