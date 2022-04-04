import { getSalesDashboardService } from "../services/getSalesDashboardService";
import { formatDate } from "../../../utils/dateFormat";

type Sales = {
  date: string;
  quantitySales: number;
}

type LastSales = {
  price: number,
  name: string,
  unity: string,
  quantity: number;
}

export const getSalesDashboardController = async (targetDate: string, days: number): Promise<any> => {
  const currentDate = new Date(targetDate)
  const currentDateTime = currentDate.getTime();
  const incrementerDay = 86400000;

  const getSales = await getSalesDashboardService.findSales(targetDate);
  let arrayDatesSales: any[] = [];

  for (let i = 0; i < days; i++) {
    arrayDatesSales.push({
      date: formatDate(new Date(currentDateTime + (incrementerDay * i))),
      quantitySales: 0
    })
  }

  getSales.map((item) => {
    let formattedDate = `${item.updated_at.getDate().toString().padStart(2, '0')}/${(item.updated_at.getMonth() + 1).toString().padStart(2, '0')}`;
    let findIndex = arrayDatesSales.findIndex((dateSale) => dateSale.date === formattedDate);
    if (findIndex > -1) {
      arrayDatesSales[findIndex].quantitySales += 1;
    }
  });

  let today = new Date();
  const todayFormattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  const getLastSales = await getSalesDashboardService.findLastSales(todayFormattedDate);
  const resultSales = {
    list: [] as Sales[],
    lastSales: [] as LastSales[],
    invested: 0,
    received: 0,
    profit: 0
  }

  getLastSales.map((item) => {
    resultSales.lastSales.push({
      price: item.product.sale_price,
      name: item.product.name,
      unity: item.unity.name,
      quantity: 1
    })
  })

  getSales.map((item) => {
    resultSales.invested += item.product.purchase_price;
    resultSales.received += item.product.sale_price;
  });

  resultSales.profit = resultSales.received - resultSales.invested;
  resultSales.list = arrayDatesSales;

  return resultSales;
}
