import { getProductsDashboardService } from '../services/getProductsDashboardService';

export const getProductsDashboardController = async (): Promise<any> => {
  const getProducts = await getProductsDashboardService.findProducts(5);
  const resultProducts = {
    list: {},
    averageTotalTicket: 0
  };
  let valueSales = 0;
  let quantitySales = 0;
  let averageTotalTicket = 0;

  getProducts.map((item) => {
    quantitySales += item.sold_amount;
    valueSales += item.sale_price * item.sold_amount;
  })

  averageTotalTicket = valueSales / quantitySales;

  resultProducts.list = getProducts.map((item) => {
    return {
      name: item.name,
      sold_amount: item.sold_amount
    }
  });
  resultProducts.averageTotalTicket = Math.floor(averageTotalTicket);

  return resultProducts;
}
