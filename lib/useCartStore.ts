import { create } from 'zustand'

interface CartItem {
  id: number
  name: string
  price: number
  qty: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: { id: number; name: string; price: number }) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) => set((state) => {
    const existing = state.cart.find((i) => i.id === item.id)
    if (existing) {
      return { cart: state.cart.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) }
    }
    return { cart: [...state.cart, { ...item, qty: 1 }] }
  }),
  removeFromCart: (id) => set((state) => {
    const existing = state.cart.find((i) => i.id === id)
    if (existing && existing.qty > 1) {
      return { cart: state.cart.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i) }
    }
    return { cart: state.cart.filter((i) => i.id !== id) }
  }),
  clearCart: () => set({ cart: [] }),
}))
