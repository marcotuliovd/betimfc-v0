"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getProducts } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { ShoppingCart, Star, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [showSuccess, setShowSuccess] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      const products = await getProducts()
      const foundProduct = products.find((p: any) => p.id === productId)
      setProduct(foundProduct)
      setLoading(false)
    }
    loadProduct()
  }, [productId])

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

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || !product) {
      return
    }

    addToCart(product, selectedSize, selectedColor, Number.parseInt(quantity))
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xl">Carregando produto...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Produto não encontrado</h1>
            <Button asChild>
              <Link href="/loja">Voltar à Loja</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const memberPrice = getMemberDiscount(product.price)
  const hasMemberDiscount = user?.membershipType && memberPrice < product.price

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                />
                {product.originalPrice && (
                  <Badge className="absolute top-4 left-4 bg-secondary">
                    -{getDiscountPercentage(product.originalPrice, product.price)}%
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge variant="destructive" className="absolute top-4 right-4">
                    Esgotado
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-lg">{product.description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline">{product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>

              {/* Price */}
              <div className="space-y-2">
                {product.originalPrice && (
                  <div className="text-lg text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </div>
                )}
                <div className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2)}</div>
                {hasMemberDiscount && (
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-secondary" />
                    <div className="text-xl font-semibold text-secondary">Preço Sócio: R$ {memberPrice.toFixed(2)}</div>
                  </div>
                )}
              </div>

              {user?.membershipType && (
                <Alert>
                  <Star className="h-4 w-4" />
                  <AlertDescription>
                    Como sócio {user.membershipType}, você economiza R$ {(product.price - memberPrice).toFixed(2)} neste
                    produto!
                  </AlertDescription>
                </Alert>
              )}

              {/* Size Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Tamanho</Label>
                <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <div key={size} className="flex items-center">
                        <RadioGroupItem value={size} id={size} className="sr-only" />
                        <Label
                          htmlFor={size}
                          className={`px-4 py-2 border rounded-md cursor-pointer transition-colors ${
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary"
                          }`}
                        >
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Cor</Label>
                <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                  <div className="space-y-2">
                    {product.colors.map((color: string) => (
                      <div key={color} className="flex items-center space-x-2">
                        <RadioGroupItem value={color} id={color} />
                        <Label htmlFor={color} className="cursor-pointer">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Quantidade</Label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showSuccess && (
                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertDescription>Produto adicionado ao carrinho com sucesso!</AlertDescription>
                </Alert>
              )}

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                  size="lg"
                  disabled={!product.inStock || !selectedSize || !selectedColor}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.inStock ? "Adicionar ao Carrinho" : "Produto Esgotado"}
                </Button>

                <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                  <Link href="/carrinho">Ver Carrinho</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
