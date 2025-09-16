"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  sizes: string[]
  colors: string[]
  gender: "masculino" | "feminino" | "infantil"
  description: string
  inStock: boolean
}

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("betim-cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("betim-cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      )

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...prev, { product, size, color, quantity }]
    })
  }

  const removeFromCart = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size && item.color === color)),
    )
  }

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color)
      return
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
