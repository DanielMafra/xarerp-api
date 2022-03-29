import { prisma } from "../database/prismaClient";
import { getDashboardService } from "../modules/dashboard/services/getDashboardService";

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

  //SALES
  const getSales = await getDashboardService.findSales('2022-03-28');
  const resultSales = {
    invested: 0,
    received: 0,
    profit: 0
  }

  getSales.map((item, index) => {
    resultSales.invested += item.product.purchase_price;
    resultSales.received += item.product.sale_price;
  });

  resultSales.profit = resultSales.received - resultSales.invested;

  //PRODUCTS
  const getProducts = await getDashboardService.findProducts('2022-03-28', 5);
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

  //RESULTS
  result.sales = resultSales;
  result.products = resultProducts;

  return result;
}
