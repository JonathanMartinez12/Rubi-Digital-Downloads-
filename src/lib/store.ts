import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id
        );

        // Digital products: don't allow duplicates, quantity is always 1
        if (existingItem) {
          return;
        }

        set({ items: [...items, { product, quantity: 1 }] });
      },

      removeItem: (productId: string) => {
        const { items } = get();
        set({ items: items.filter((item) => item.product.id !== productId) });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.product.price, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.product.price, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: "rubi-cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
