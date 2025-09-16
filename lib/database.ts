import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export { sql }

// Tipos TypeScript para as tabelas
export interface UserProfile {
  id: string
  email: string
  name: string
  phone?: string
  cpf?: string
  birth_date?: string
  membership_type: "none" | "mensal" | "trimestral" | "anual"
  membership_expires_at?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  category: string
  gender: "masculino" | "feminino" | "infantil" | "unissex"
  sizes: string[]
  colors: string[]
  image_url?: string
  stock: number
  active: boolean
  created_at: string
}

export interface Order {
  id: number
  user_id: string
  total: number
  discount: number
  shipping_cost: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  payment_method?: string
  shipping_address?: any
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  size?: string
  color?: string
  unit_price: number
  total_price: number
}

export interface Membership {
  id: number
  user_id: string
  plan_type: "mensal" | "trimestral" | "anual"
  price: number
  start_date: string
  end_date: string
  status: "active" | "expired" | "cancelled"
  payment_method?: string
  created_at: string
}
