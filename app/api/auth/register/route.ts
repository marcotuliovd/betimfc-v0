import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, cpf, birthDate, acceptTerms, receiveNews } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Nome, email e senha são obrigatórios" }, { status: 400 })
    }

    if (!phone || !cpf) {
      return NextResponse.json({ error: "Telefone e CPF são obrigatórios" }, { status: 400 })
    }

    if (!acceptTerms) {
      return NextResponse.json({ error: "Você deve aceitar os termos e condições" }, { status: 400 })
    }

    // Verificar se usuário já existe
    const existingUsers = await sql`
      SELECT id FROM betim_futebol.user_profiles WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "Usuário já existe com este email" }, { status: 409 })
    }

    // Gerar ID único
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const userData = {
      phone,
      cpf,
      birthDate: birthDate || null,
      acceptTerms,
      receiveNews,
      registeredAt: new Date().toISOString(),
    }

    // Inserir no neon_auth.users_sync primeiro
    await sql`
      INSERT INTO neon_auth.users_sync (id, email, name, raw_json)
      VALUES (${userId}, ${email}, ${name}, ${JSON.stringify(userData)})
    `

    await sql`
      INSERT INTO betim_futebol.user_profiles (id, email, name, phone, cpf, birth_date, membership_type, receive_news, created_at)
      VALUES (
        ${userId}, 
        ${email}, 
        ${name}, 
        ${phone}, 
        ${cpf}, 
        ${birthDate || null}, 
        'none', 
        ${receiveNews}, 
        NOW()
      )
    `

    return NextResponse.json({
      user: {
        id: userId,
        name,
        email,
        phone,
        membershipType: "none",
      },
    })
  } catch (error) {
    console.error("Erro no registro:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
