"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth-context"
import { User, Crown, CreditCard, Ticket, Gift, Calendar, Settings, LogOut, Edit, Save, X } from "lucide-react"

export default function MinhaContaPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      setEditData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      })
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleSaveProfile = () => {
    // Aqui seria a chamada para API para atualizar os dados
    console.log("Salvando dados:", editData)
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const membershipBenefits = {
    mensal: {
      name: "Plano Mensal",
      discount: "20%",
      freeTickets: 0,
      storeDiscount: "10%",
    },
    trimestral: {
      name: "Plano Trimestral",
      discount: "30%",
      freeTickets: 1,
      storeDiscount: "15%",
    },
    anual: {
      name: "Plano Anual",
      discount: "40%",
      freeTickets: 2,
      storeDiscount: "20%",
    },
  }

  const currentPlan = user.membershipType
    ? membershipBenefits[user.membershipType as keyof typeof membershipBenefits]
    : null

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-primary">Olá, {user.name}!</h1>
                  <p className="text-muted-foreground">
                    {user.membershipType ? (
                      <span className="flex items-center space-x-2">
                        <Crown className="h-4 w-4 text-secondary" />
                        <span>Sócio Torcedor - {currentPlan?.name}</span>
                      </span>
                    ) : (
                      "Torcedor cadastrado"
                    )}
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="perfil" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="perfil">Perfil</TabsTrigger>
                <TabsTrigger value="assinatura">Assinatura</TabsTrigger>
                <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
                <TabsTrigger value="historico">Histórico</TabsTrigger>
              </TabsList>

              {/* Aba Perfil */}
              <TabsContent value="perfil" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Dados Pessoais</CardTitle>
                      <CardDescription>Gerencie suas informações pessoais</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                    >
                      {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      {isEditing ? "Cancelar" : "Editar"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input
                              id="name"
                              value={editData.name}
                              onChange={(e) => setEditData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={editData.email}
                              onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={editData.phone}
                            onChange={(e) => setEditData((prev) => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <Button onClick={handleSaveProfile}>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Nome</Label>
                            <p className="text-lg">{user.name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                            <p className="text-lg">{user.email}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Telefone</Label>
                          <p className="text-lg">{user.phone || "Não informado"}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aba Assinatura */}
              <TabsContent value="assinatura" className="space-y-6">
                {user.membershipType ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        <Crown className="h-5 w-5 text-secondary" />
                        <CardTitle>Assinatura Ativa</CardTitle>
                      </div>
                      <CardDescription>Gerencie sua assinatura de sócio torcedor</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{currentPlan?.name}</h3>
                          <p className="text-sm text-muted-foreground">Renovação automática ativa</p>
                        </div>
                        <Badge variant="secondary">Ativo</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Alterar Plano
                        </Button>
                        <Button variant="outline">
                          <Settings className="mr-2 h-4 w-4" />
                          Gerenciar Pagamento
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Torne-se Sócio Torcedor</CardTitle>
                      <CardDescription>Tenha acesso a benefícios exclusivos</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <a href="/socio-torcedor">Ver Planos Disponíveis</a>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Aba Benefícios */}
              <TabsContent value="beneficios" className="space-y-6">
                {user.membershipType && currentPlan ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Ticket className="h-5 w-5 text-primary" />
                          <CardTitle>Ingressos</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-primary">{currentPlan.discount}</p>
                          <p className="text-sm text-muted-foreground">Desconto em ingressos</p>
                          {currentPlan.freeTickets > 0 && (
                            <p className="text-sm">
                              <span className="font-semibold">{currentPlan.freeTickets}</span> ingresso(s) grátis por
                              mês
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Gift className="h-5 w-5 text-secondary" />
                          <CardTitle>Loja Oficial</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold text-secondary">{currentPlan.storeDiscount}</p>
                          <p className="text-sm text-muted-foreground">Desconto na loja</p>
                          <Button size="sm" asChild>
                            <a href="/loja">Ir às Compras</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Alert>
                    <AlertDescription>
                      Torne-se sócio torcedor para ter acesso aos benefícios exclusivos!
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              {/* Aba Histórico */}
              <TabsContent value="historico" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Atividades</CardTitle>
                    <CardDescription>Suas últimas atividades no clube</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 border rounded-lg">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Conta criada</p>
                          <p className="text-sm text-muted-foreground">Bem-vindo à família Betim Futebol!</p>
                        </div>
                        <span className="text-sm text-muted-foreground ml-auto">Hoje</span>
                      </div>

                      {user.membershipType && (
                        <div className="flex items-center space-x-4 p-3 border rounded-lg">
                          <Crown className="h-5 w-5 text-secondary" />
                          <div>
                            <p className="font-medium">Assinatura ativada</p>
                            <p className="text-sm text-muted-foreground">{currentPlan?.name}</p>
                          </div>
                          <span className="text-sm text-muted-foreground ml-auto">Hoje</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </div>
  )
}
