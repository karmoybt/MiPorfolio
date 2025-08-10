// server/api/auth/login.post.ts
import { Client } from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface DbUser {
  id: string
  name: string
  password: string
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const client = new Client(useRuntimeConfig().databaseUrl)
  await client.connect()

  try {
    const res = await client.query(
      'SELECT id, name, password FROM public.usuarios WHERE email = $1;',
      [email]
    );

    if (res.rows.length === 0) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const user = res.rows[0] as DbUser
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { sub: user.id, name: user.name, email },
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

    return { token, user: { id: user.id, name: user.name, email } }
  } finally {
    await client.end()
  }
})