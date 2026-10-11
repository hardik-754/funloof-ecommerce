import fs from "fs";
import path from "path";
import { Product, Order, Customer, BlogPost, SiteSettings, OrderStatus } from "../types";
import {
  initialProducts,
  initialOrders,
  initialCustomers,
  initialBlogPosts,
  initialSiteSettings,
} from "./seed-data";

interface DatabaseState {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  blogPosts: BlogPost[];
  siteSettings: SiteSettings;
}

// In-memory cache for serverless environments (e.g. Vercel)
let memoryState: DatabaseState = {
  products: [...initialProducts],
  orders: [...initialOrders],
  customers: [...initialCustomers],
  blogPosts: [...initialBlogPosts],
  siteSettings: { ...initialSiteSettings },
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

function loadFromDisk(): DatabaseState {
  try {
    if (typeof window === "undefined" && fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Could not read local store.json, using in-memory state:", err);
  }
  return memoryState;
}

function saveToDisk(state: DatabaseState) {
  memoryState = state;
  try {
    if (typeof window === "undefined") {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Could not write to store.json (normal in readonly serverless environments):", err);
  }
}

// Initialize on boot
if (typeof window === "undefined") {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      saveToDisk(memoryState);
    } else {
      memoryState = loadFromDisk();
    }
  } catch (err) {
    // Keep in-memory
  }
}

export const db = {
  // PRODUCTS
  async getProducts(): Promise<Product[]> {
    const state = loadFromDisk();
    return state.products;
  },

  async getProductById(id: string): Promise<Product | null> {
    const state = loadFromDisk();
    return state.products.find((p) => p.id === id) || null;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const state = loadFromDisk();
    return state.products.find((p) => p.slug === slug) || null;
  },

  async createProduct(productData: Omit<Product, "id" | "createdAt">): Promise<Product> {
    const state = loadFromDisk();
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    state.products.unshift(newProduct);
    saveToDisk(state);
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const state = loadFromDisk();
    const index = state.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    state.products[index] = { ...state.products[index], ...updates };
    saveToDisk(state);
    return state.products[index];
  },

  async deleteProduct(id: string): Promise<boolean> {
    const state = loadFromDisk();
    const initialLen = state.products.length;
    state.products = state.products.filter((p) => p.id !== id);
    if (state.products.length < initialLen) {
      saveToDisk(state);
      return true;
    }
    return false;
  },

  // ORDERS
  async getOrders(): Promise<Order[]> {
    const state = loadFromDisk();
    return state.orders;
  },

  async getOrderById(id: string): Promise<Order | null> {
    const state = loadFromDisk();
    return state.orders.find((o) => o.id === id) || null;
  },

  async createOrder(orderData: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">): Promise<Order> {
    const state = loadFromDisk();
    const orderNumber = `FNL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.orders.unshift(newOrder);

    // Update product inventory counts
    for (const item of newOrder.items) {
      const product = state.products.find((p) => p.id === item.productId);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
      }
    }

    // Update / create Customer in CRM
    const existingCust = state.customers.find((c) => c.email.toLowerCase() === newOrder.customer.email.toLowerCase());
    if (existingCust) {
      existingCust.totalOrders += 1;
      existingCust.totalSpent = Number((existingCust.totalSpent + newOrder.total).toFixed(2));
      existingCust.lastOrderDate = new Date().toISOString().split("T")[0];
      if (existingCust.totalSpent > 150) existingCust.isVip = true;
    } else {
      state.customers.unshift({
        id: `cust-${Date.now()}`,
        name: newOrder.customer.fullName,
        email: newOrder.customer.email,
        phone: newOrder.customer.phone || "",
        city: `${newOrder.customer.city}, ${newOrder.customer.state}`,
        totalOrders: 1,
        totalSpent: newOrder.total,
        lastOrderDate: new Date().toISOString().split("T")[0],
        isVip: newOrder.total > 150,
        createdAt: new Date().toISOString(),
      });
    }

    saveToDisk(state);
    return newOrder;
  },

  async updateOrderStatus(
    id: string,
    status: OrderStatus,
    trackingNumber?: string,
    carrier?: string
  ): Promise<Order | null> {
    const state = loadFromDisk();
    const order = state.orders.find((o) => o.id === id);
    if (!order) return null;
    order.status = status;
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
    if (carrier !== undefined) order.carrier = carrier;
    order.updatedAt = new Date().toISOString();
    saveToDisk(state);
    return order;
  },

  // CUSTOMERS (CRM)
  async getCustomers(): Promise<Customer[]> {
    const state = loadFromDisk();
    return state.customers;
  },

  // BLOG POSTS
  async getBlogPosts(): Promise<BlogPost[]> {
    const state = loadFromDisk();
    return state.blogPosts;
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const state = loadFromDisk();
    return state.blogPosts.find((b) => b.slug === slug) || null;
  },

  async createBlogPost(postData: Omit<BlogPost, "id" | "publishedAt">): Promise<BlogPost> {
    const state = loadFromDisk();
    const newPost: BlogPost = {
      ...postData,
      id: `post-${Date.now()}`,
      publishedAt: new Date().toISOString(),
    };
    state.blogPosts.unshift(newPost);
    saveToDisk(state);
    return newPost;
  },

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const state = loadFromDisk();
    const index = state.blogPosts.findIndex((b) => b.id === id);
    if (index === -1) return null;
    state.blogPosts[index] = { ...state.blogPosts[index], ...updates };
    saveToDisk(state);
    return state.blogPosts[index];
  },

  async deleteBlogPost(id: string): Promise<boolean> {
    const state = loadFromDisk();
    const initialLen = state.blogPosts.length;
    state.blogPosts = state.blogPosts.filter((b) => b.id !== id);
    if (state.blogPosts.length < initialLen) {
      saveToDisk(state);
      return true;
    }
    return false;
  },

  // SITE SETTINGS (CMS)
  async getSiteSettings(): Promise<SiteSettings> {
    const state = loadFromDisk();
    return state.siteSettings;
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const state = loadFromDisk();
    state.siteSettings = { ...state.siteSettings, ...settings };
    saveToDisk(state);
    return state.siteSettings;
  },

  // ADMIN ANALYTICS METRICS
  async getMetrics() {
    const state = loadFromDisk();
    const totalRevenue = state.orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    const totalOrders = state.orders.length;
    const totalProducts = state.products.length;
    const lowStockCount = state.products.filter((p) => p.stock <= 15).length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalCustomers = state.customers.length;

    return {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders,
      totalProducts,
      lowStockCount,
      averageOrderValue: Number(averageOrderValue.toFixed(2)),
      totalCustomers,
      recentOrders: state.orders.slice(0, 5),
    };
  },

  // RESET TO DEMO DATA
  async resetToDemo(): Promise<void> {
    const defaultState: DatabaseState = {
      products: [...initialProducts],
      orders: [...initialOrders],
      customers: [...initialCustomers],
      blogPosts: [...initialBlogPosts],
      siteSettings: { ...initialSiteSettings },
    };
    saveToDisk(defaultState);
  },
};
