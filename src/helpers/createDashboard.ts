import { prisma } from "../database/prismaClient";
import { getDashboardService } from "../modules/dashboard/services/getDashboardService";

type Sales = {
  purchase_price: number;
  sale_price: number;
  name: string;
  date: Date;
}

type SalesDefaultStore = {
  purchase_price: number;
  sale_price: number;
  date: Date;
}

type SalesRankingStores = {
  name: string;
  type: string;
  profit: number;
}

export const createDashboard = async (type: string) => {
  const result = {
    sales: {},
    products: {},
    financial: {},
    purchases: {},
    stores: {},
    clients: {},
    sellers: {},
    carriers: {},
    providers: {}
  };

  //SALES IN THE LAST 7 DAYS
  const getSales = await getDashboardService.findSales('2022-03-28');
  const resultSales = {
    list: [] as Sales[],
    invested: 0,
    received: 0,
    profit: 0
  }

  getSales.map((item) => {
    resultSales.list.push({
      purchase_price: item.product.purchase_price,
      sale_price: item.product.sale_price,
      name: item.product.name,
      date: item.updated_at
    })
  });

  getSales.map((item) => {
    resultSales.invested += item.product.purchase_price;
    resultSales.received += item.product.sale_price;
  });

  resultSales.profit = resultSales.received - resultSales.invested;

  //TOP 5 PRODUCTS
  const getProducts = await getDashboardService.findProducts(5);
  const resultProducts = {
    list: {},
    averageTotalTicket: 0
  };
  let valueSales = 0;
  let quantitySales = 0;
  let averageTotalTicket = 0;

  getProducts.map((item, index) => {
    quantitySales += item.sold_amount;
    valueSales += item.sale_price * item.sold_amount;
  })

  averageTotalTicket = valueSales / quantitySales;

  resultProducts.list = getProducts;
  resultProducts.averageTotalTicket = Math.floor(averageTotalTicket);

  //FINANCIAL IN THE LAST 7 DAYS
  const getFinancial = await getDashboardService.findFinancial('2022-03-28');
  const resultFinancial = {
    list: {},
    totalEntries: 0,
    totalOutputs: 0,
    difference: 0
  };

  resultFinancial.list = getFinancial;

  getFinancial.map((item) => {
    if (item.type === 0) {
      resultFinancial.totalOutputs += item.value
    } else {
      resultFinancial.totalEntries += item.value
    }
  });

  resultFinancial.difference = resultFinancial.totalEntries - resultFinancial.totalOutputs;

  //PURCHASES IN THE LAST 7 DAYS
  const getPurchases = await getDashboardService.findPurchases('2022-03-28');
  const resultPurchases = {
    list: {},
    totalSpend: 0
  }

  resultPurchases.list = getPurchases;

  getPurchases.map((item) => {
    resultPurchases.totalSpend += item.quantity * item.unit_price;
  })

  //SALES DEFAULT STORE AND TOP 5 STORES
  const getDefaultStores = await getDashboardService.findSalesDefaultStore('2022-03-28', 'Matriz');
  const getOtherStores = await getDashboardService.findSalesOtherStores('2022-03-28');
  const resultStores = {
    default: [] as SalesDefaultStore[],
    productsPurchaseValue: 0,
    productsSaleValue: 0,
    profit: 0,
    ranking: [] as SalesRankingStores[],
  }

  getDefaultStores.map((item) => {
    resultStores.default.push({
      purchase_price: item.product.purchase_price,
      sale_price: item.product.sale_price,
      date: item.product.updated_at
    });
    resultStores.productsSaleValue += item.product.sale_price;
    resultStores.productsPurchaseValue += item.product.purchase_price;
  });

  resultStores.profit = resultStores.productsSaleValue - resultStores.productsPurchaseValue;

  getOtherStores.map((item) => {
    let findIndex = resultStores.ranking.findIndex((store) => store.name === item.unity.name);
    if (findIndex > -1) {
      resultStores.ranking[findIndex].profit += item.product.sale_price - item.product.purchase_price;
    } else {
      resultStores.ranking.push({
        name: item.unity.name,
        type: item.unity.type,
        profit: item.product.sale_price - item.product.purchase_price
      });
    }
  });

  resultStores.ranking.sort((a, b) => {
    return a.profit + b.profit;
  });

  if (resultStores.ranking.length > 5) {
    resultStores.ranking = resultStores.ranking.slice(0, 5);
  }

  //RESULTS
  result.sales = resultSales;
  result.products = resultProducts;
  result.financial = resultFinancial;
  result.purchases = resultPurchases;
  result.stores = resultStores;

  return result;
}
