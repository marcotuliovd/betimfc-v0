"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { CheckCircle, Crown, Gift, Ticket } from "lucide-react"
import Link from "next/link"

export default function SucessoPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-primary mb-4">Parabéns!</h1>
              <p className="text-xl text-muted-foreground">
                Sua assinatura foi ativada com sucesso. Bem-vindo à família Betim Futebol!
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-center space-x-2">
                  <Crown className="h-6 w-6 text-secondary" />
                  <CardTitle>Você agora é Sócio Torcedor!</CardTitle>
                </div>
                <CardDescription>
                  Plano ativo: <span className="font-medium text-primary capitalize">{user.membershipType}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <Ticket className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Descontos</h3>
                    <p className="text-sm text-muted-foreground">Em ingressos e produtos</p>
                  </div>
                  <div>
                    <Gift className="h-8 w-8 text-secondary mx-auto mb-2" />
                    <h3 className="font-semibold">Benefícios</h3>
                    <p className="text-sm text-muted-foreground">Exclusivos para sócios</p>
                  </div>
                  <div>
                    <Crown className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Prioridade</h3>
                    <p className="text-sm text-muted-foreground">Em todos os serviços</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Próximos Passos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild size="lg" className="h-auto p-4">
                  <Link href="/loja" className="flex flex-col items-center space-y-2">
                    <span className="font-semibold">Visite a Loja</span>
                    <span className="text-sm opacity-90">Use seus descontos exclusivos</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-auto p-4 bg-transparent">
                  <Link href="/" className="flex flex-col items-center space-y-2">
                    <span className="font-semibold">Voltar ao Início</span>
                    <span className="text-sm opacity-90">Explore o site do clube</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-card rounded-lg">
              <p className="text-sm text-muted-foreground">
                Em breve você receberá um email com todos os detalhes da sua assinatura e instruções sobre como
                aproveitar ao máximo seus benefícios como sócio torcedor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
