"use client"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { CheckCircle, Package, Truck, Star } from "lucide-react"
import Link from "next/link"

export default function CheckoutSucessoPage() {
  const { user } = useAuth()
  const router = useRouter()

  const orderNumber = `BF${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-primary mb-4">Pedido Confirmado!</h1>
              <p className="text-xl text-muted-foreground">
                Obrigado pela sua compra! Seu pedido foi processado com sucesso.
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Detalhes do Pedido</CardTitle>
                <CardDescription>Número do pedido: #{orderNumber}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Processando</h3>
                    <p className="text-sm text-muted-foreground">Preparando seu pedido</p>
                  </div>
                  <div>
                    <Truck className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-semibold text-muted-foreground">Em Trânsito</h3>
                    <p className="text-sm text-muted-foreground">Em breve</p>
                  </div>
                  <div>
                    <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <h3 className="font-semibold text-muted-foreground">Entregue</h3>
                    <p className="text-sm text-muted-foreground">Aguardando</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {user?.membershipType && (
              <Card className="mb-8 border-secondary/20 bg-secondary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-secondary" />
                    <span className="font-semibold">Benefício Sócio Torcedor Aplicado!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Você economizou com desconto exclusivo e frete grátis. Continue aproveitando seus benefícios!
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">Próximos Passos</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild size="lg" className="h-auto p-4">
                  <Link href="/loja" className="flex flex-col items-center space-y-2">
                    <span className="font-semibold">Continuar Comprando</span>
                    <span className="text-sm opacity-90">Explore mais produtos</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-auto p-4 bg-transparent">
                  <Link href="/" className="flex flex-col items-center space-y-2">
                    <span className="font-semibold">Voltar ao Início</span>
                    <span className="text-sm opacity-90">Página inicial do clube</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-card rounded-lg">
              <p className="text-sm text-muted-foreground">
                Você receberá um email de confirmação com todos os detalhes do seu pedido e informações de rastreamento.
                Em caso de dúvidas, entre em contato conosco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
