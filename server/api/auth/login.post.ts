// server/api/auth/login.post.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../db/models/user';


export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const userModel = await User.findOne({ where: { email } });

  if (!userModel) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  const user = userModel.get() as { id: number, name: string, email: string, password: string | null };

  if (user.password === null) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { sub: user.id, name: user.name, email },
    useRuntimeConfig().authSecret,
    { expiresIn: '7d' }
  );

  setCookie(event, 'auth', token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 días
  });

  return { token, user: { id: user.id, name: user.name, email } };
});