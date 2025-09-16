"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { Loader2, CreditCard, Smartphone, Building } from "lucide-react"

const membershipPlans = {
  mensal: { name: "Plano Mensal", price: 29.9, period: "mês" },
  trimestral: { name: "Plano Trimestral", price: 79.9, period: "trimestre" },
  anual: { name: "Plano Anual", price: 299.9, period: "ano" },
}

export default function CheckoutPage() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan") as keyof typeof membershipPlans

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    cpf: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
    if (!planId || !membershipPlans[planId]) {
      router.push("/socio-torcedor")
    }
  }, [user, planId, router])

  if (!user || !planId || !membershipPlans[planId]) {
    return null
  }

  const selectedPlan = membershipPlans[planId]

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

      // Atualizar o usuário com o novo plano
      const updatedUser = { ...user, membershipType: planId as any }
      localStorage.setItem("betim-user", JSON.stringify(updatedUser))

      // Redirecionar para página de sucesso
      router.push("/socio-torcedor/sucesso")
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
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Finalizar Assinatura</h1>
              <p className="text-muted-foreground">Complete os dados para ativar seu plano</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Resumo do Pedido */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Período: {selectedPlan.period}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">R$ {selectedPlan.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Formulário de Pagamento */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados de Pagamento</CardTitle>
                    <CardDescription>Escolha a forma de pagamento e complete os dados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Método de Pagamento */}
                      <div className="space-y-3">
                        <Label>Forma de Pagamento</Label>
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
                      </div>

                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4">
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
                          `Pagar R$ ${selectedPlan.price.toFixed(2)}`
                        )}
                      </Button>
                    </form>
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
