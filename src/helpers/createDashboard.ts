import { getDashboardService } from "../modules/dashboard/services/getDashboardService";
import { formatDate } from "../utils/dateFormat";

//===============
import { getSalesDashboardController } from '../modules/dashboard/controllers/getSalesDashboardController';
import { getProductsDashboardController } from "../modules/dashboard/controllers/getProductsDashboardController";
//===============

type FinancialData = {
  date: string;
  positive: number;
  negative: number;
}

type ProfitByType = {
  type: string;
  profit: number;
}

type RankingByType = {
  type: string;
  name: string;
  profit: number;
}

export const createDashboard = async (type: string, targetDate: string, days: number) => {
  const currentDate = new Date(targetDate)
  const currentDateTime = currentDate.getTime();
  const incrementerDay = 86400000;
  const result = {
    sales: {},
    products: {},
    financial: {},
    stores: {}
  };

  //======
  const getSales = await getSalesDashboardController(targetDate, days);
  const getProducts = await getProductsDashboardController();
  //======

  //FINANCIAL IN THE LAST 7 DAYS
  const getFinancial = await getDashboardService.findFinancial(targetDate);

  //=============================
  let arrayDatesFinancial: any[] = [];

  for (let i = 0; i < days; i++) {
    arrayDatesFinancial.push({
      date: formatDate(new Date(currentDateTime + (incrementerDay * i))),
      negative: 0,
      positive: 0
    })
  }

  getFinancial.map((item) => {
    let formattedDate = `${item.updated_at.getDate().toString().padStart(2, '0')}/${(item.updated_at.getMonth() + 1).toString().padStart(2, '0')}`;
    let findIndex = arrayDatesFinancial.findIndex((dateSale) => dateSale.date === formattedDate);
    if (findIndex > -1) {
      if (item.type === 0) {
        arrayDatesFinancial[findIndex].negative += -Math.abs(item.value);
      } else {
        arrayDatesFinancial[findIndex].positive += item.value;
      }
    }
  });
  //==============================

  const resultFinancial = {
    list: [] as FinancialData[],
    totalEntries: 0,
    totalOutputs: 0,
    difference: 0
  };

  getFinancial.map((item) => {
    if (item.type === 0) {
      resultFinancial.totalOutputs += item.value
    } else {
      resultFinancial.totalEntries += item.value
    }
  });

  resultFinancial.difference = resultFinancial.totalEntries - resultFinancial.totalOutputs;
  resultFinancial.list = arrayDatesFinancial;

  //SALES DEFAULT STORE AND TOP 5 STORES
  const getStores = await getDashboardService.findSalesDefaultStore(targetDate);
  let formattedRankingByType: RankingByType[] = [];
  let orderRankingByType: RankingByType[] = [];
  const resultStores = {
    profitByType: [] as ProfitByType[],
    rankingByType: [] as RankingByType[]
  }

  getStores.map((item) => {
    let findIndex = formattedRankingByType.findIndex((store: RankingByType) => store.name === item.unity.name);
    if (findIndex > -1) {
      formattedRankingByType[findIndex].profit += item.product.sale_price - item.product.purchase_price;
    } else {
      formattedRankingByType.push({
        type: item.unity.type,
        name: item.unity.name,
        profit: item.product.sale_price - item.product.purchase_price
      });
    }
  });

  formattedRankingByType.map((item) => {
    let findIndex = orderRankingByType.findIndex((store: RankingByType) => store.type === item.type);
    if (findIndex > -1) {
      if (item.profit > orderRankingByType[findIndex].profit) {
        orderRankingByType[findIndex].name = item.name
        orderRankingByType[findIndex].profit = item.profit
      }
    } else {
      orderRankingByType.push({
        name: item.name,
        type: item.type,
        profit: item.profit
      });
    }
  });

  resultStores.rankingByType = orderRankingByType.sort((a: any, b: any) => {
    if (a.profit === b.profit) {
      return 0;
    }

    return a.profit > b.profit ? -1 : 1;
  });

  getStores.map((item) => {
    let findIndex = resultStores.profitByType.findIndex((store: ProfitByType) => store.type === item.unity.type);
    if (findIndex > -1) {
      resultStores.profitByType[findIndex].profit += item.product.sale_price - item.product.purchase_price;
    } else {
      resultStores.profitByType.push({
        type: item.unity.type,
        profit: item.product.sale_price - item.product.purchase_price
      });
    }
  });

  //RESULTS
  result.sales = getSales;
  result.products = getProducts;
  result.financial = resultFinancial;
  result.stores = resultStores;

  return result;
}
