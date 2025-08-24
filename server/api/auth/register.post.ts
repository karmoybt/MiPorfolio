import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../db/models/user'; 

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  // Verificar si el correo electrónico ya está registrado
  const exists = await User.findOne({ where: { email } });
  if (exists) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' });
  }

  // Hash de la contraseña
  const hashed = await bcrypt.hash(password, 10);

  try {
    // Crear un nuevo usuario
    const user = await User.create({ name, email, password: hashed });

    // Tipificar el modelo de usuario
    const userData = user.get() as { id: number, name: string, email: string };

    // Generar un token JWT
    const token = jwt.sign(
      { sub: userData.id, name: userData.name, email: userData.email },
      useRuntimeConfig().authSecret,
      { expiresIn: '7d' }
    );

    // Establecer la cookie de autenticación
    setCookie(event, 'auth', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    });

    // Devolver el token y los datos del usuario
    return { token, user: { id: userData.id, name: userData.name, email: userData.email } };
  } catch (error) {
    console.error('Error during registration:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});