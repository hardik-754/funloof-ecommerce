"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, SiteSettings, BlogPost } from "../types";
import { initialProducts, initialSiteSettings, initialBlogPosts } from "../db/seed-data";

interface StoreContextType {
  products: Product[];
  settings: SiteSettings;
  blogPosts: BlogPost[];
  isLoading: boolean;
  refreshStore: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [isLoading, setIsLoading] = useState(false);

  const refreshStore = async () => {
    try {
      setIsLoading(true);
      const [prodRes, cmsRes, blogRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/cms"),
        fetch("/api/blog"),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }
      if (cmsRes.ok) {
        const cmsData = await cmsRes.json();
        setSettings(cmsData);
      }
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setBlogPosts(blogData);
      }
    } catch (err) {
      console.warn("Using offline state in StoreProvider");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshStore();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        blogPosts,
        isLoading,
        refreshStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
