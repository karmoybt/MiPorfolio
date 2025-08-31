import jwt from 'jsonwebtoken';
import User from '../db/models/User';

export default defineEventHandler(async (event) => {
  // Obtener el token del encabezado
  const authHeader = getHeader(event, 'authorization');
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  // Extraer el token usando una expresión regular
  const token = authHeader.replace(/^Bearer\s+/i, '');
  console.log('Extracted Token:', token);

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  try {
    // Verificar y decodificar el token
    const payload = jwt.verify(token, useRuntimeConfig().authSecret);

    // Extraer el ID del usuario del payload
    const userId = payload.userId;

    // Obtener el usuario asociado al token
    const user = await User.findByPk(userId);
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    return user;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' + error });
  }
});