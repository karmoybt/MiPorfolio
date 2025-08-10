// server/api/auth/logout.post.ts
export default defineEventHandler(async (event) => {
  // Eliminar el token del estado de autenticación
  setCookie(event, 'auth', '', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1 // Fecha de expiración en el pasado
  });
    // Redirigir al usuario a la página de inicio o a la página de autenticación
    // const redirectUrl = '/auth'; // Cambia esto a la URL deseada
    
  return { ok: true };
});