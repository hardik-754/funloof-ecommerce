import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const age = searchParams.get("age");
    const skill = searchParams.get("skill");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search")?.toLowerCase();

    let products = await db.getProducts();

    if (age) {
      products = products.filter((p) => p.ageGroup === age);
    }
    if (skill) {
      products = products.filter((p) => p.skills.some((s) => s.toLowerCase() === skill.toLowerCase()));
    }
    if (featured === "true") {
      products = products.filter((p) => p.isFeatured);
    }
    if (search) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.tagline.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.skills.some((s) => s.toLowerCase().includes(search))
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price) {
      return NextResponse.json({ error: "Product name and price are required" }, { status: 400 });
    }

    const slug =
      body.slug ||
      body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newProduct = await db.createProduct({
      ...body,
      slug,
      rating: body.rating || 5.0,
      reviewCount: body.reviewCount || 0,
      images: body.images && body.images.length > 0 ? body.images : [
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80",
      ],
      skills: body.skills || [],
      materials: body.materials || ["Solid FSC Wood"],
      safetyCertifications: body.safetyCertifications || ["ASTM F963", "EN71"],
      whyParentsLoveIt: body.whyParentsLoveIt || ["Durable heirloom quality", "Screen-free focus"],
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
