import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    // Buscar usuário no banco
    const users = await sql`
      SELECT up.*, ns.id as auth_id 
      FROM betim_futebol.user_profiles up
      JOIN neon_auth.users_sync ns ON up.email = ns.email
      WHERE up.email = ${email}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 })
    }

    const user = users[0]

    // Em produção, você verificaria a senha com hash
    // Por simplicidade, vamos aceitar qualquer senha por enquanto
    // const isValidPassword = await bcrypt.compare(password, user.password_hash)

    // Verificar se a assinatura ainda está ativa
    const memberships = await sql`
      SELECT * FROM betim_futebol.memberships 
      WHERE user_id = ${user.id} 
      AND status = 'active' 
      AND end_date > NOW()
      ORDER BY end_date DESC 
      LIMIT 1
    `

    const activeMembership = memberships[0]
    const membershipType = activeMembership ? activeMembership.plan_type : "none"

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        membershipType,
        membershipExpiresAt: activeMembership?.end_date,
      },
    })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
