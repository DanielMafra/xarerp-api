import { prisma } from "../database/prismaClient";
import { getDashboardService } from "../modules/dashboard/services/getDashboardService";

type Sales = {
  purchase_price: number;
  sale_price: number;
  name: string;
  date: Date;
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

  //RESULTS
  result.sales = resultSales;
  result.products = resultProducts;
  result.financial = resultFinancial;

  return result;
}
