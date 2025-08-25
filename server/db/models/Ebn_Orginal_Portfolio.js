// server\db\models\Ebn_Orginal_Portfolio.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Ebn_Orginal_Portfolio = sequelize.define('Ebn_Orginal_Portfolio', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Nombre de la tabla relacionada
        key: 'id',     // Campo de la tabla relacionada
      }
    },
    FundIsin: {
      type: DataTypes.STRING(50),
    },
    FundName: {
      type: DataTypes.STRING(255),
    },
    FundShares: {
      type: DataTypes.DECIMAL(18, 6),
    },
    ValuedDate: {
      type: DataTypes.DATE,
    },
    CcyNeg: {
      type: DataTypes.STRING(10),
    },
    CcyLiq: {
      type: DataTypes.STRING(10),
    },
    InitialPriceNeg: {
      type: DataTypes.DECIMAL(18, 6),
    },
    InitialPriceLiq: {
      type: DataTypes.DECIMAL(18, 6),
    },
    InitialAmountNeg: {
      type: DataTypes.DECIMAL(18, 6),
    },
    InitialAmountLiq: {
      type: DataTypes.DECIMAL(18, 6),
    },
    LastPriceNeg: {
      type: DataTypes.DECIMAL(18, 6),
    },
    LastPriceLiq: {
      type: DataTypes.DECIMAL(18, 6),
    },
    ValuedAmountNeg: {
      type: DataTypes.DECIMAL(18, 6),
    },
    ValuedAmountLiq: {
      type: DataTypes.DECIMAL(18, 6),
    },
    ProfitLossNeg: {
      type: DataTypes.DECIMAL(18, 6),
    },
    ProfitLossLiq: {
      type: DataTypes.DECIMAL(18, 6),
    },
    DividendChargedNeg: {
      type: DataTypes.DECIMAL(18, 6),
    },
    DividendChargedLiq: {
      type: DataTypes.DECIMAL(18, 6),
    },
    PercentagePortfolio: {
      type: DataTypes.DECIMAL(18, 6),
    },
    InFlightTransfer: {
      type: DataTypes.STRING(1),
    },
    ExRate: {
      type: DataTypes.DECIMAL(18, 6),
    },
    InitialExRate: {
      type: DataTypes.DECIMAL(18, 6),
    },
    ReturnLiq: {
      type: DataTypes.DECIMAL(18, 6),
    },
  });

  return Ebn_Orginal_Portfolio;
};