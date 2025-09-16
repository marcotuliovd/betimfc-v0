"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Loader2, CreditCard, Smartphone, Building, Star, Truck } from "lucide-react"

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    // Shipping
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    // Payment
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    cpf: "",
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push("/carrinho")
    }
  }, [items, router])

  if (items.length === 0) {
    return null
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

  const getTotalWithMemberDiscount = () => {
    return items.reduce((total, item) => {
      const itemPrice = getMemberDiscount(item.product.price)
      return total + itemPrice * item.quantity
    }, 0)
  }

  const originalTotal = getTotalPrice()
  const memberTotal = getTotalWithMemberDiscount()
  const savings = originalTotal - memberTotal

  const shippingCosts = {
    standard: 15.9,
    express: 29.9,
    free: 0,
  }

  const shippingCost = user?.membershipType
    ? shippingCosts.free
    : shippingCosts[shippingMethod as keyof typeof shippingCosts]
  const finalTotal = (user?.membershipType ? memberTotal : originalTotal) + shippingCost

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsProcessing(true)

    // Simular processamento do pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    try {
      // Aqui seria a integração com gateway de pagamento
      // Por enquanto, vamos simular sucesso

      // Limpar carrinho
      clearCart()

      // Redirecionar para página de sucesso
      router.push("/checkout/sucesso")
    } catch (err) {
      setError("Erro ao processar pagamento. Tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8">Finalizar Compra</h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Shipping Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Dados de Entrega</CardTitle>
                      <CardDescription>Informações para entrega do seu pedido</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Nome Completo</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">CEP</Label>
                          <Input
                            id="zipCode"
                            placeholder="00000-000"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                          id="address"
                          placeholder="Rua, Avenida, etc."
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="number">Número</Label>
                          <Input
                            id="number"
                            value={formData.number}
                            onChange={(e) => handleInputChange("number", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="complement">Complemento</Label>
                          <Input
                            id="complement"
                            placeholder="Apto, Bloco, etc."
                            value={formData.complement}
                            onChange={(e) => handleInputChange("complement", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="neighborhood">Bairro</Label>
                          <Input
                            id="neighborhood"
                            value={formData.neighborhood}
                            onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Cidade</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">Estado</Label>
                          <Input
                            id="state"
                            placeholder="MG"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Forma de Entrega</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" disabled={!!user?.membershipType} />
                            <Truck className="h-5 w-5" />
                            <div>
                              <Label htmlFor="standard">Entrega Padrão</Label>
                              <p className="text-sm text-muted-foreground">5-7 dias úteis</p>
                            </div>
                          </div>
                          <span className={user?.membershipType ? "line-through text-muted-foreground" : ""}>
                            R$ {shippingCosts.standard.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" disabled={!!user?.membershipType} />
                            <Truck className="h-5 w-5" />
                            <div>
                              <Label htmlFor="express">Entrega Expressa</Label>
                              <p className="text-sm text-muted-foreground">2-3 dias úteis</p>
                            </div>
                          </div>
                          <span className={user?.membershipType ? "line-through text-muted-foreground" : ""}>
                            R$ {shippingCosts.express.toFixed(2)}
                          </span>
                        </div>

                        {user?.membershipType && (
                          <div className="flex items-center justify-between p-3 border-2 border-secondary rounded-lg bg-secondary/5">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="free" id="free" />
                              <Star className="h-5 w-5 text-secondary" />
                              <div>
                                <Label htmlFor="free" className="text-secondary">
                                  Entrega Grátis Sócio
                                </Label>
                                <p className="text-sm text-muted-foreground">3-5 dias úteis</p>
                              </div>
                            </div>
                            <span className="text-secondary font-semibold">Grátis</span>
                          </div>
                        )}
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Forma de Pagamento</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <CreditCard className="h-5 w-5" />
                          <Label htmlFor="credit-card">Cartão de Crédito</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="pix" id="pix" />
                          <Smartphone className="h-5 w-5" />
                          <Label htmlFor="pix">PIX</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value="boleto" id="boleto" />
                          <Building className="h-5 w-5" />
                          <Label htmlFor="boleto">Boleto Bancário</Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="cardNumber">Número do Cartão</Label>
                              <Input
                                id="cardNumber"
                                placeholder="0000 0000 0000 0000"
                                value={formData.cardNumber}
                                onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                                required
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="cardName">Nome no Cartão</Label>
                              <Input
                                id="cardName"
                                placeholder="Nome como está no cartão"
                                value={formData.cardName}
                                onChange={(e) => handleInputChange("cardName", e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="expiryDate">Validade</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/AA"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="000"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange("cvv", e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange("cpf", e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando Pagamento...
                      </>
                    ) : (
                      `Finalizar Compra - R$ ${finalTotal.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Products */}
                    <div className="space-y-3">
                      {items.map((item) => {
                        const memberPrice = getMemberDiscount(item.product.price)
                        const itemTotal = (user?.membershipType ? memberPrice : item.product.price) * item.quantity

                        return (
                          <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.size} • {item.color} • Qtd: {item.quantity}
                              </p>
                            </div>
                            <span className="text-sm">R$ {itemTotal.toFixed(2)}</span>
                          </div>
                        )
                      })}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>R$ {originalTotal.toFixed(2)}</span>
                      </div>

                      {user?.membershipType && savings > 0 && (
                        <div className="flex justify-between text-secondary">
                          <span className="flex items-center space-x-1">
                            <Star className="h-4 w-4" />
                            <span>Desconto Sócio</span>
                          </span>
                          <span>-R$ {savings.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span className="flex items-center space-x-1">
                          <Truck className="h-4 w-4" />
                          <span>Entrega</span>
                        </span>
                        <span className={shippingCost === 0 ? "text-secondary" : ""}>
                          {shippingCost === 0 ? "Grátis" : `R$ ${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">R$ {finalTotal.toFixed(2)}</span>
                    </div>

                    {user?.membershipType && (
                      <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                        <p className="text-sm text-center text-secondary font-medium">
                          Você economizou R$ {(savings + (user.membershipType ? 15.9 : 0)).toFixed(2)} sendo sócio
                          torcedor!
                        </p>
                      </div>
                    )}
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
