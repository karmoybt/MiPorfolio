// server\db\models\fondo.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Fondo = sequelize.define('Fondo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isin: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    enlace: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fechaalta: {
      type: DataTypes.DATETIME,
      defaultValue: DataTypes.NOW,
    },
    fechabaja: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Fondo;
};