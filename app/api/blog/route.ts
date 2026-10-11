import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await db.getBlogPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await db.getBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newPost = await db.createBlogPost({
      title: body.title,
      slug,
      excerpt: body.excerpt || body.content.slice(0, 150) + "...",
      content: body.content,
      coverImage: body.coverImage || "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80",
      author: body.author || {
        name: "Funloof Editorial Team",
        role: "Play & Child Development",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      },
      category: body.category || "Montessori at Home",
      readTime: body.readTime || "4 min read",
      isPublished: body.isPublished !== undefined ? body.isPublished : true,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const updated = await db.updateBlogPost(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const success = await db.deleteBlogPost(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 });
  }
}
