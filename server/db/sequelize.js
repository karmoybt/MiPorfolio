// server\db\sequelize.js
import { Sequelize, DataTypes } from 'sequelize';

const sequelizeInstance = new Sequelize({
  dialect: 'sqlite',
  storage: './server/db/database.sqlite',
});

export { sequelizeInstance, DataTypes };