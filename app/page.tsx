import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Users, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { SponsorsCarousel } from "@/components/sponsors-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-16 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">Betim Futebol</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
              Tradição, paixão e história no futebol mineiro. Junte-se à nossa família azul, branca e vermelha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/socio-torcedor">Seja Sócio Torcedor</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Link href="/loja">Loja Oficial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">75+</div>
              <div className="text-muted-foreground">Anos de História</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">15K+</div>
              <div className="text-muted-foreground">Torcedores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">8</div>
              <div className="text-muted-foreground">Títulos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">2024</div>
              <div className="text-muted-foreground">Temporada Atual</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Faça Parte da Nossa História</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Descubra todas as formas de apoiar o Betim Futebol e viver a paixão azul, branca e vermelha.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Sócio Torcedor</CardTitle>
                <CardDescription>Benefícios exclusivos e prioridade na compra de ingressos</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Link href="/socio-torcedor">Saiba Mais</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Loja Oficial</CardTitle>
                <CardDescription>Camisas oficiais e produtos exclusivos do clube</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="secondary"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  <Link href="/loja">Comprar</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Próximos Jogos</CardTitle>
                <CardDescription>Acompanhe o calendário e não perca nenhum jogo</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/institucional">Ver Calendário</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>História</CardTitle>
                <CardDescription>Conheça a rica história e conquistas do clube</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/institucional">Conhecer</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsors Carousel Section */}
      <SponsorsCarousel />

      {/* Latest News */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Últimas Notícias</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Badge className="w-fit mb-2">Destaque</Badge>
                <CardTitle className="text-lg">Nova Temporada 2024</CardTitle>
                <CardDescription>Betim Futebol se prepara para mais uma temporada cheia de emoções</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  Sócio Torcedor
                </Badge>
                <CardTitle className="text-lg">Novos Benefícios</CardTitle>
                <CardDescription>Confira as novidades do programa Sócio Torcedor para 2024</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
                  Loja
                </Badge>
                <CardTitle className="text-lg">Nova Coleção</CardTitle>
                <CardDescription>Chegaram as novas camisas oficiais da temporada 2024</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">BF</span>
                </div>
                <span className="font-bold text-lg">Betim Futebol</span>
              </div>
              <p className="text-primary-foreground/80">Tradição e paixão no futebol mineiro desde 1949.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link href="/institucional" className="hover:text-primary-foreground">
                    Institucional
                  </Link>
                </li>
                <li>
                  <Link href="/comercial" className="hover:text-primary-foreground">
                    Comercial
                  </Link>
                </li>
                <li>
                  <Link href="/socio-torcedor" className="hover:text-primary-foreground">
                    Sócio Torcedor
                  </Link>
                </li>
                <li>
                  <Link href="/loja" className="hover:text-primary-foreground">
                    Loja
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Betim, Minas Gerais</li>
                <li>contato@betimfutebol.com.br</li>
                <li>(31) 3594-0000</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <span className="sr-only">Facebook</span>📘
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <span className="sr-only">Instagram</span>📷
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <span className="sr-only">Twitter</span>🐦
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
            <p>&copy; 2024 Betim Futebol. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
