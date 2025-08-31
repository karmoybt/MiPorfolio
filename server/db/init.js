import fs from 'fs';
import path from 'path';
import { sequelizeInstance as sequelize } from './sequelize';
import { Sequelize } from 'sequelize';

// Función para realizar el backup de la base de datos
const backupDatabase = async (models) => {
  const backupDir = path.join(__dirname, 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const backupFile = path.join(backupDir, `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  const backupData = {};

  for (const model of models) {
    const modelName = model.name;
    const data = await model.findAll();
    backupData[modelName] = data.map(item => item.toJSON());
  }

  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
  console.log(`Backup creado en ${backupFile}`);
};

// Función para cargar y sincronizar los modelos
const loadModels = async () => {
  // Define la ruta a la carpeta 'models'
  const modelsDir = path.join(__dirname, '/models');
  const modelFiles = fs.readdirSync(modelsDir).filter(file => file.endsWith('.js') && file !== 'init.js');
  const models = [];

  for (const file of modelFiles) {
    const modelModule = await import(path.join(modelsDir, file));
    console.log(modelModule.default);
    if (typeof modelModule.default === 'function') {
      models.push(modelModule.default(sequelize));
    } else if (modelModule.default instanceof Sequelize.Model) {
      models.push(new modelModule.default(sequelize));
    }
  }

  // Realizar el backup antes de sincronizar
  await backupDatabase(models).catch(err => {
    console.error('Error al crear el backup:', err);
    return;
  });

  // Sincronizar los modelos con la base de datos
  await sequelize.sync({ alter: true}).then(() => {
    console.log('Modelos sincronizados correctamente.');
  }).catch(err => {
    console.error('Error al sincronizar los modelos:', err);
  });

  console.log('Modelos cargados y sincronizados correctamente.');
};

// Ejecutar la función para cargar y sincronizar los modelos
loadModels().catch(err => {
  console.error('Error al cargar los modelos:', err);
});