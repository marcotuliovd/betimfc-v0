export async function getProducts(category?: string, gender?: string) {
  try {
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    if (gender) params.append("gender", gender)

    const response = await fetch(`/api/products?${params.toString()}`)
    if (!response.ok) {
      throw new Error("Erro ao buscar produtos")
    }

    return await response.json()
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)
    return []
  }
}

export const categories = ["Todas", "Camisa", "Agasalho", "Acessorio"]
export const genders = ["Todos", "masculino", "feminino", "infantil", "unissex"]
export const sizes = ["PP", "P", "M", "G", "GG", "XGG", "2", "4", "6", "8", "10", "12", "14"]
