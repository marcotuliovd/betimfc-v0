"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Check, Crown, Star, Gift, Calendar, Users, Ticket } from "lucide-react"

const membershipPlans = [
  {
    id: "mensal",
    name: "Plano Mensal",
    price: 29.9,
    period: "mês",
    description: "Ideal para começar sua jornada como sócio torcedor",
    features: [
      "Desconto de 20% em ingressos",
      "Acesso ao app exclusivo",
      "Newsletter semanal",
      "Desconto de 10% na loja oficial",
    ],
    popular: false,
    icon: Calendar,
  },
  {
    id: "trimestral",
    name: "Plano Trimestral",
    price: 79.9,
    period: "trimestre",
    originalPrice: 89.7,
    description: "O plano mais escolhido pelos torcedores",
    features: [
      "Desconto de 30% em ingressos",
      "Acesso ao app exclusivo",
      "Newsletter semanal",
      "Desconto de 15% na loja oficial",
      "Ingresso grátis por mês",
      "Acesso a eventos exclusivos",
    ],
    popular: true,
    icon: Star,
  },
  {
    id: "anual",
    name: "Plano Anual",
    price: 299.9,
    period: "ano",
    originalPrice: 358.8,
    description: "Máximo benefício para o verdadeiro torcedor",
    features: [
      "Desconto de 40% em ingressos",
      "Acesso ao app exclusivo",
      "Newsletter semanal",
      "Desconto de 20% na loja oficial",
      "2 ingressos grátis por mês",
      "Acesso a eventos exclusivos",
      "Camisa oficial grátis",
      "Visita ao centro de treinamento",
    ],
    popular: false,
    icon: Crown,
  },
]

export default function SocioTorcedorPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    router.push(`/socio-torcedor/checkout?plan=${planId}`)
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">Seja Sócio Torcedor</h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                Faça parte da família Betim Futebol e tenha acesso a benefícios exclusivos, descontos especiais e muito
                mais!
              </p>

              {user.membershipType && (
                <div className="bg-card p-6 rounded-lg border mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Crown className="h-5 w-5 text-secondary" />
                    <span className="font-semibold text-lg">Você já é sócio torcedor!</span>
                  </div>
                  <p className="text-muted-foreground">
                    Plano atual: <span className="font-medium text-primary capitalize">{user.membershipType}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Benefícios Exclusivos</h2>
              <p className="text-xl text-muted-foreground">Vantagens que só um sócio torcedor tem</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Descontos em Ingressos</h3>
                <p className="text-muted-foreground text-sm">Até 40% de desconto em todos os jogos</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Produtos Exclusivos</h3>
                <p className="text-muted-foreground text-sm">Acesso a produtos limitados da loja</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Eventos Exclusivos</h3>
                <p className="text-muted-foreground text-sm">Encontros com jogadores e diretoria</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Prioridade</h3>
                <p className="text-muted-foreground text-sm">Atendimento prioritário em todos os canais</p>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Escolha Seu Plano</h2>
              <p className="text-xl text-muted-foreground">Planos flexíveis para todos os perfis de torcedores</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {membershipPlans.map((plan) => {
                const Icon = plan.icon
                return (
                  <Card
                    key={plan.id}
                    className={`relative ${plan.popular ? "border-secondary shadow-lg scale-105" : ""}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary">
                        Mais Popular
                      </Badge>
                    )}

                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>

                      <div className="mt-4">
                        {plan.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            R$ {plan.originalPrice.toFixed(2)}
                          </div>
                        )}
                        <div className="text-3xl font-bold text-primary">R$ {plan.price.toFixed(2)}</div>
                        <div className="text-muted-foreground">por {plan.period}</div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handlePlanSelect(plan.id)}
                        disabled={user.membershipType === plan.id}
                      >
                        {user.membershipType === plan.id ? "Plano Atual" : "Escolher Plano"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Perguntas Frequentes</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Como funciona o programa Sócio Torcedor?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    O programa oferece benefícios exclusivos como descontos em ingressos, produtos da loja oficial,
                    acesso a eventos especiais e muito mais. Você escolhe o plano que melhor se adequa ao seu perfil.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Posso cancelar minha assinatura a qualquer momento?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sim! Você pode cancelar sua assinatura a qualquer momento através do seu painel de controle. Os
                    benefícios continuam válidos até o final do período pago.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Como recebo os ingressos gratuitos?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Os ingressos gratuitos são creditados automaticamente na sua conta todo mês e podem ser utilizados
                    para qualquer jogo em casa, sujeito à disponibilidade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
