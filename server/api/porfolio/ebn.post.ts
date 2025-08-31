import { sequelizeInstance as sequelize } from '../../db/sequelize';
import Ebn_Orginal_Portfolio from '../../db/models/Ebn_Orginal_Portfolio';
import User from '../../db/models/User';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const Ebn_Orginal_PortfolioModel = Ebn_Orginal_Portfolio(sequelize);
    const UserModel = User(sequelize);

    // Obtener el primer usuario
    const user = await UserModel.findOne({
      attributes: ['id'],
      order: [['id', 'ASC']],
      limit: 1,
    });
    console.log(user.id)
    if (!user) {
      throw new Error('No se encontró ningún usuario');
    }

    for (const position of body.position) {
      const portfolioData = {
        UserId: user.id,
        FundIsin: position.fundIsin,
        FundName: position.fundName,
        FundShares: position.fundShares,
        ValuedDate: new Date(position.valuedDate),
        CcyNeg: position.ccyNeg,
        CcyLiq: position.ccyLiq,
        InitialPriceNeg: position.initialPriceNeg,
        InitialPriceLiq: position.initialPriceLiq,
        InitialAmountNeg: position.initialAmountNeg,
        InitialAmountLiq: position.initialAmountLiq,
        LastPriceNeg: position.lastPriceNeg,
        LastPriceLiq: position.lastPriceLiq,
        ValuedAmountNeg: position.valuedAmountNeg,
        ValuedAmountLiq: position.valuedAmountLiq,
        ProfitLossNeg: position.profitLossNeg,
        ProfitLossLiq: position.profitLossLiq,
        DividendChargedNeg: position.dividendChargedNeg,
        DividendChargedLiq: position.dividendChargedLiq,
        PercentagePortfolio: position.percentagePortfolio,
        InFlightTransfer: position.inFlightTransfer,
        ExRate: position.exRate,
        InitialExRate: position.initialExRate,
        ReturnLiq: position.returnLiq,
      };

      // Crear una nueva entrada en la tabla Ebn_Orginal_Portfolio
      await Ebn_Orginal_PortfolioModel.create(portfolioData);
    }

    return { message: 'Cartera importada correctamente' };
  } catch (error) {
    console.error('Error al importar la cartera:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});