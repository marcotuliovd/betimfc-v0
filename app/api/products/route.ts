import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const gender = searchParams.get("gender")

    let query = sql`
      SELECT * FROM betim_futebol.products 
      WHERE active = true
    `

    // Aplicar filtros se fornecidos
    if (category && category !== "Todas") {
      query = sql`
        SELECT * FROM betim_futebol.products 
        WHERE active = true AND category = ${category.toLowerCase()}
      `
    }

    if (gender && gender !== "Todos") {
      if (category && category !== "Todas") {
        query = sql`
          SELECT * FROM betim_futebol.products 
          WHERE active = true AND category = ${category.toLowerCase()} AND gender = ${gender}
        `
      } else {
        query = sql`
          SELECT * FROM betim_futebol.products 
          WHERE active = true AND gender = ${gender}
        `
      }
    }

    const products = await query

    // Transformar para o formato esperado pelo frontend
    const formattedProducts = products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      price: Number.parseFloat(product.price),
      image: product.image_url || "/placeholder-20dw2.png",
      category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
      sizes: product.sizes,
      colors: product.colors,
      gender: product.gender,
      description: product.description,
      inStock: product.stock > 0,
    }))

    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
