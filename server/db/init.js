import fs from 'fs';
import path from 'path';
import sequelize from './sequelize.js';
import { Sequelize } from 'sequelize';

const loadModels = async () => {
  // Define la ruta a la carpeta 'models'
  const modelsDir = path.join(__dirname, 'models');
  const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.js') && file !== 'init.js');
  const models = [];

  for (const file of modelFiles) {
    const modelModule = await import(path.join(modelsDir, file));
    if (typeof modelModule.default === 'function') {
      models.push(modelModule.default(sequelize));
      console.log(`Modelo cargado: ${file}`);
    } else if (modelModule.default instanceof Sequelize) { 
      console.log(`El archivo ${file} exporta una instancia de Sequelize.`);
    } else {
      console.error(`El modelo ${file} no tiene una exportación predeterminada que sea una función.`);
    }
  }

  // Sincronizar los modelos con la base de datos
  await sequelize.sync({ force: false }).then(() => {
    console.log('Modelos sincronizados correctamente.');
  }).catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });

  console.log('Modelos cargados y sincronizados correctamente.');
};

loadModels().catch(err => {
  console.error('Error al cargar los modelos:', err);
});