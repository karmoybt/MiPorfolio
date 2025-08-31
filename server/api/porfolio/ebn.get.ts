// server/api/porfolio/ebn.get.ts
import  Ebn_Orginal_Portfolio from '../../db/models/Ebn_Orginal_Portfolio';
import  {sequelizeInstance}  from '../../db/sequelize'; 
import decodeToken   from '../../utils/decodeToken.js'

export default defineEventHandler(async (_event) => {
  try {
     const user = await decodeToken (_event);
    // Realiza la consulta para obtener los registros de la tabla filtrados por UserId
    const portfolios = await Ebn_Orginal_Portfolio(sequelizeInstance).findAll({
      where: {
        UserId: user.id
      }
    });

    // Validación de datos (opcional)
    if (!portfolios || portfolios.length === 0) {
      throw createError({ statusCode: 404, statusMessage: 'No portfolios found' });
    }

    return portfolios;
  } catch (error) {
    console.error('Error al obtener la cartera:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});