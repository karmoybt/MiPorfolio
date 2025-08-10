// server/api/auth/session.get.ts
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!auth) return null

  try {
    const payload = jwt.verify(auth, useRuntimeConfig().authSecret)
    return payload
  } catch {
    return null
  }
})