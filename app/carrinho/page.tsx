"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Minus, Plus, Trash2, ShoppingBag, Star } from "lucide-react"
import Link from "next/link"

export default function CarrinhoPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart()
  const { user } = useAuth()

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

  const getTotalWithMemberDiscount = () => {
    return items.reduce((total, item) => {
      const itemPrice = getMemberDiscount(item.product.price)
      return total + itemPrice * item.quantity
    }, 0)
  }

  const totalItems = getTotalItems()
  const originalTotal = getTotalPrice()
  const memberTotal = getTotalWithMemberDiscount()
  const savings = originalTotal - memberTotal

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />

        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <ShoppingBag className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-primary mb-4">Seu carrinho está vazio</h1>
              <p className="text-muted-foreground mb-8">
                Que tal dar uma olhada em nossos produtos oficiais do Betim Futebol?
              </p>
              <Button asChild size="lg">
                <Link href="/loja">Ir às Compras</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8">Carrinho de Compras</h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => {
                  const memberPrice = getMemberDiscount(item.product.price)
                  const hasMemberDiscount = user?.membershipType && memberPrice < item.product.price

                  return (
                    <Card key={`${item.product.id}-${item.size}-${item.color}`}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline">Tamanho: {item.size}</Badge>
                              <Badge variant="outline">Cor: {item.color}</Badge>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="text-lg font-bold text-primary">R$ {item.product.price.toFixed(2)}</div>
                                {hasMemberDiscount && (
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-secondary" />
                                    <span className="text-secondary font-semibold">R$ {memberPrice.toFixed(2)}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>

                                <Input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      item.product.id,
                                      item.size,
                                      item.color,
                                      Number.parseInt(e.target.value) || 1,
                                    )
                                  }
                                  className="w-16 text-center"
                                />

                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                                  }
                                  disabled={item.quantity >= 10}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                    <CardDescription>{totalItems} item(s) no carrinho</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} itens)</span>
                      <span>R$ {originalTotal.toFixed(2)}</span>
                    </div>

                    {user?.membershipType && savings > 0 && (
                      <>
                        <div className="flex justify-between text-secondary">
                          <span className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>Desconto Sócio</span>
                          </span>
                          <span>-R$ {savings.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-primary">R$ {memberTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {!user?.membershipType && (
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-primary">R$ {originalTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {!user?.membershipType && (
                      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                        <p className="text-sm text-center">
                          <Link href="/socio-torcedor" className="text-secondary hover:underline font-medium">
                            Torne-se sócio torcedor
                          </Link>{" "}
                          e ganhe até 20% de desconto!
                        </p>
                      </div>
                    )}

                    <Button asChild className="w-full" size="lg">
                      <Link href="/checkout">Finalizar Compra</Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href="/loja">Continuar Comprando</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
