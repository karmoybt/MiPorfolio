// server/api/auth/register.post.ts
import { Client } from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface DbUser {
  id: string
  name: string
  email: string
}

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)

  // Hash password
  const hashed = await bcrypt.hash(password, 10)

  const client = new Client(useRuntimeConfig().databaseUrl)
  await client.connect()

  try {
    // Verificar duplicado
    const exists = await client.query(
      'SELECT id FROM public.usuarios WHERE email = $1 LIMIT 1',
      [email]
    )
    if (exists.rows.length) {
      throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
    }

    // Insertar
    const res = await client.query<DbUser>(
      'INSERT INTO public.usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashed]
    )

    const user = res.rows[0]

    // Token opcional (auto-login tras registro)
    const token = jwt.sign(
      { sub: user.id, name: user.name, email: user.email },
      useRuntimeConfig().authSecret,
      { expiresIn: '7d' }
    )

    // Guardar el token en el estado de autenticación
    setCookie(event, 'auth', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    })

    return { token, user }
  } finally {
    await client.end()
  }
})