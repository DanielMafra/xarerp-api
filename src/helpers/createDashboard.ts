import { getDashboardService } from "../modules/dashboard/services/getDashboardService";

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

type SellersBySales = {
  name: string;
  unity: string;
  totalSales: number;
}

export const createDashboard = async (type: string) => {
  const result = {
    sales: {},
    products: {},
    financial: {},
    stores: {},
    sellers: {},
    carriers: {}
  };

  //SALES IN THE LAST 7 DAYS
  const getSales = await getDashboardService.findSales('2022-03-28');
  const getLastSales = await getDashboardService.findLastSales('2022-03-31');
  let listBySales: Sales[] = [];
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
    let formattedDate = `${item.updated_at.getDate().toString().padStart(2, '0')}/${(item.updated_at.getMonth() + 1).toString().padStart(2, '0')}`;
    listBySales.push({
      date: formattedDate,
      quantitySales: 1
    })
  });

  listBySales.map((item) => {
    let findIndex = resultSales.list.findIndex((dateSale) => dateSale.date === item.date);
    if (findIndex > -1) {
      resultSales.list[findIndex].quantitySales += 1;
    } else {
      resultSales.list.push({
        date: item.date,
        quantitySales: item.quantitySales
      });
    }
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

  resultProducts.list = getProducts.map((item, index) => {
    return {
      name: item.name,
      sold_amount: item.sold_amount
    }
  });
  resultProducts.averageTotalTicket = Math.floor(averageTotalTicket);

  //FINANCIAL IN THE LAST 7 DAYS
  const getFinancial = await getDashboardService.findFinancial('2022-03-28');
  let listFinancial: FinancialData[] = [];
  const resultFinancial = {
    list: [] as FinancialData[],
    totalEntries: 0,
    totalOutputs: 0,
    difference: 0
  };

  getFinancial.map((item) => {
    let formattedDate = `${item.updated_at.getDate().toString().padStart(2, '0')}/${(item.updated_at.getMonth() + 1).toString().padStart(2, '0')}`;
    if (item.type === 0) {
      listFinancial.push({
        date: formattedDate,
        negative: -Math.abs(item.value),
        positive: 0
      });
    } else {
      listFinancial.push({
        date: formattedDate,
        negative: 0,
        positive: item.value
      });
    }
  });

  getFinancial.map((item) => {
    let formattedDate = `${item.updated_at.getDate().toString().padStart(2, '0')}/${(item.updated_at.getMonth() + 1).toString().padStart(2, '0')}`;
    let findIndex = resultFinancial.list.findIndex((financial: any) => financial.date === formattedDate);
    if (findIndex > -1) {
      if (item.type === 0) {
        resultFinancial.list[findIndex].negative += -Math.abs(item.value);
      } else {
        resultFinancial.list[findIndex].positive += item.value;
      }
    } else {
      if (item.type === 0) {
        resultFinancial.list.push({
          date: formattedDate,
          negative: -Math.abs(item.value),
          positive: 0
        });
      } else {
        resultFinancial.list.push({
          date: formattedDate,
          negative: 0,
          positive: item.value
        });
      }
    }
  });

  getFinancial.map((item) => {
    if (item.type === 0) {
      resultFinancial.totalOutputs += item.value
    } else {
      resultFinancial.totalEntries += item.value
    }
  });

  resultFinancial.difference = resultFinancial.totalEntries - resultFinancial.totalOutputs;

  //SALES DEFAULT STORE AND TOP 5 STORES
  const getStores = await getDashboardService.findSalesDefaultStore('2022-03-28');
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

  //TOP 5 SELLERS
  const getSellers = await getDashboardService.findSellers('2022-03-28');
  const resultSellers = {
    list: [] as SellersBySales[]
  }

  getSellers.map((item) => {
    let findIndex = resultSellers.list.findIndex((seller) => seller.name === item.seller.user.name);
    if (findIndex > -1) {
      resultSellers.list[findIndex].totalSales += 1;
    } else {
      resultSellers.list.push({
        name: item.seller.user.name,
        unity: item.unity.name,
        totalSales: 1
      });
    }
  });

  resultSellers.list = resultSellers.list.sort((a: any, b: any) => {
    if (a.totalSales === b.totalSales) {
      return 0;
    }

    return a.totalSales > b.totalSales ? -1 : 1;
  });

  if (resultSellers.list.length > 5) {
    resultSellers.list = resultSellers.list.slice(0, 5);
  }

  //TOP 5 CARRIERS
  const getCarriers = await getDashboardService.findCarriers('2022-03-28');
  let listByCarriers = [] as any;
  let listByRegions = [] as any;
  const resultCarriers = {
    rankingByCarriers: [],
    rankingByRegions: []
  }

  getCarriers.map((item) => {
    let findIndex = listByCarriers.findIndex((carrier: any) => carrier.name === item.carrier.name);
    if (findIndex > -1) {
      listByCarriers[findIndex].quantity += 1;
    } else {
      listByCarriers.push({
        name: item.carrier.name,
        quantity: 1
      });
    }
  });

  getCarriers.map((item) => {
    let findIndex = listByRegions.findIndex((region: any) => region.region === item.carrier.region);
    if (findIndex > -1) {
      listByRegions[findIndex].quantity += 1;
    } else {
      listByRegions.push({
        region: item.carrier.region,
        quantity: 1
      });
    }
  });

  resultCarriers.rankingByCarriers = listByCarriers.sort((a: any, b: any) => {
    if (a.quantity === b.quantity) {
      return 0;
    }

    return a.quantity > b.quantity ? -1 : 1;
  });

  resultCarriers.rankingByRegions = listByRegions.sort((a: any, b: any) => {
    if (a.quantity === b.quantity) {
      return 0;
    }

    return a.quantity > b.quantity ? -1 : 1;
  });

  if (resultCarriers.rankingByCarriers.length > 5) {
    resultCarriers.rankingByCarriers = resultCarriers.rankingByCarriers.slice(0, 5);
  }

  if (resultCarriers.rankingByRegions.length > 5) {
    resultCarriers.rankingByRegions = resultCarriers.rankingByRegions.slice(0, 5);
  }

  //RESULTS
  result.sales = resultSales;
  result.products = resultProducts;
  result.financial = resultFinancial;
  result.stores = resultStores;
  result.sellers = resultSellers;
  result.carriers = resultCarriers;

  return result;
}
