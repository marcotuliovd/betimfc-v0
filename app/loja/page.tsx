"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProducts, categories, genders } from "@/lib/products"
import { useAuth } from "@/lib/auth-context"
import { Search, Filter, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"

export default function LojaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedGender, setSelectedGender] = useState("Todos")
  const [sortBy, setSortBy] = useState("name")
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { user } = useAuth()

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
      setLoading(false)
    }
    loadProducts()
  }, [])

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory
      const matchesGender = selectedGender === "Todos" || product.gender === selectedGender
      return matchesSearch && matchesCategory && matchesGender
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  const getMemberDiscount = (price: number) => {
    if (!user?.membershipType) return price

    const discountRates = {
      mensal: 0.1, // 10%
      trimestral: 0.15, // 15%
      anual: 0.2, // 20%
    }

    const discount = discountRates[user.membershipType] || 0
    return price * (1 - discount)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl">Carregando produtos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Loja Oficial</h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Camisas oficiais e produtos exclusivos do Betim Futebol. Vista as cores do seu coração!
              </p>

              {user?.membershipType && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-secondary" />
                    <span className="font-semibold">Desconto Sócio Torcedor Ativo!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Como sócio {user.membershipType}, você tem{" "}
                    {user.membershipType === "mensal" ? "10%" : user.membershipType === "trimestral" ? "15%" : "20%"} de
                    desconto em todos os produtos
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-card">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <Label>Categoria:</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Label>Gênero:</Label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender === "Todos" ? "Todos" : gender.charAt(0).toUpperCase() + gender.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Label>Ordenar:</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nome A-Z</SelectItem>
                      <SelectItem value="price-low">Menor Preço</SelectItem>
                      <SelectItem value="price-high">Maior Preço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const memberPrice = getMemberDiscount(product.price)
                const hasMemberDiscount = user?.membershipType && memberPrice < product.price

                return (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.originalPrice && (
                          <Badge className="absolute top-2 left-2 bg-secondary">
                            -{getDiscountPercentage(product.originalPrice, product.price)}%
                          </Badge>
                        )}
                        {!product.inStock && (
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            Esgotado
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-4">
                      <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                      <CardDescription className="text-sm mb-3 line-clamp-2">{product.description}</CardDescription>

                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="outline">
                          {product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}
                        </Badge>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        {product.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            R$ {product.originalPrice.toFixed(2)}
                          </div>
                        )}
                        <div className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</div>
                        {hasMemberDiscount && (
                          <div className="text-lg font-semibold text-secondary">Sócio: R$ {memberPrice.toFixed(2)}</div>
                        )}
                      </div>

                      <Button asChild className="w-full" disabled={!product.inStock}>
                        <Link href={`/loja/${product.id}`}>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {product.inStock ? "Ver Produto" : "Esgotado"}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">Nenhum produto encontrado com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
