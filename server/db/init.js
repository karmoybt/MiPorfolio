// server/db/init.js
import sequelize from './sequelize.js';  
  
export default async function init() {  
  try {  
    await sequelize.sync();  
    console.log('Base de datos inicializada correctamente');  
  } catch (error) {  
    console.error('Error al inicializar la base de datos:', error);  
    throw error;  
  }  
}