// server/api/porfolio/ebn.get.ts
import  Ebn_Orginal_Portfolio from '../../db/models/Ebn_Orginal_Portfolio';
import  {sequelizeInstance}  from '../../db/sequelize'; 


export default defineEventHandler(async (_event) => {
  console.log('API called: /api/portfolio/ebn');
  try {
    // Realiza la consulta para obtener todos los registros de la tabla
    const portfolios = await Ebn_Orginal_Portfolio(sequelizeInstance).findAll();

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