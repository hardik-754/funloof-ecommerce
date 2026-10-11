"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  freeShippingThreshold: number;
  amountLeftForFreeShipping: number;
  freeShippingProgress: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const freeShippingThreshold = 1499;

  // Persist cart in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("funloof_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load cart from storage");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("funloof_cart", JSON.stringify(items));
    } catch (e) {
      // storage quota or incognito
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(item.product.stock, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (
      clean === "BACHPAN" ||
      clean === "DESIPLAY10" ||
      clean === "ECOPLAY" ||
      clean === "FUNLOOF10" ||
      clean === "SPRING10"
    ) {
      setAppliedPromo(clean);
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = Math.round(
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  const discount = appliedPromo && subtotal > 0 ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 99;
  const total = Math.round(subtotal - discount + shipping);

  const amountLeftForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount,
        shipping,
        total,
        appliedPromo,
        applyPromo,
        removePromo,
        freeShippingThreshold,
        amountLeftForFreeShipping,
        freeShippingProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
