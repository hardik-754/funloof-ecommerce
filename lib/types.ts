export type AgeGroup = "0-12m" | "1-3y" | "3-5y" | "5y+";

export type SkillCategory =
  | "Fine Motor Skills"
  | "STEM & Logic"
  | "Spatial Reasoning"
  | "Sensory Play"
  | "Creative Expression"
  | "Hand-Eye Coordination";

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  ageGroup: AgeGroup;
  ageLabel: string; // e.g. "12 - 36 Months"
  skills: SkillCategory[];
  materials: string[];
  safetyCertifications: string[];
  stock: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  whyParentsLoveIt: string[];
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  createdAt: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  trackingNumber?: string;
  carrier?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  isVip: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: "Montessori at Home" | "Developmental Milestones" | "Screen-Free Play" | "Sustainable Parenting";
  readTime: string;
  isPublished: boolean;
  publishedAt: string;
}

export interface SiteSettings {
  announcementText: string;
  announcementLink: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
  heroImage: string;
  heroCtaText: string;
  heroCtaLink: string;
  freeShippingThreshold: number;
  currency: string;
  currencySymbol: string;
  contactEmail: string;
  instagramHandle: string;
}
