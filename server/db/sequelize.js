// server/db/sequelize.js
import { Sequelize } from 'sequelize';

const sequelizeInstance = new Sequelize({
  dialect: 'sqlite',
  storage: './server/db/database.sqlite',
});

export default sequelizeInstance;