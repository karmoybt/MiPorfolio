import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sequelizeInstance as sequelize } from '../../db/sequelize';
import User from '../../db/models/User';

// Inicializar el modelo User
const UserModel = User(sequelize);

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  // Buscar el usuario por correo electrónico
  const userModel = await UserModel.findOne({ where: { email } });

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