import Link from "next/link";
import { POSTS } from "@/lib/blog";
import { Pencil, Eye, Plus } from "lucide-react";

export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-1">Manage posts, tutorials and guides.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>
      <div className="rounded-2xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Published</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {POSTS.map((p) => (
              <tr key={p.slug}>
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground capitalize">{p.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(p.publishedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <Link href={`/blog/${p.slug}`} target="_blank" className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-accent">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
