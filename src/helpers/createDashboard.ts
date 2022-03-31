import { prisma } from "../database/prismaClient";
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

type ClientRankingByValue = {
  name: string;
  unity: string;
  value: number;
}

type ClientRankingByRecorrence = {
  name: string;
  unity: string;
  recorrence: number;
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
    purchases: {},
    stores: {},
    clients: {},
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

  //TOP 5 CLIENTS
  const getClients = await getDashboardService.findClients('2022-03-28');
  let list = [] as any;
  const resultClients = {
    rankingByValue: [] as ClientRankingByValue[],
    rankingByRecorrence: [] as ClientRankingByRecorrence[]
  }

  getClients.map((item) => {
    let findIndex = list.findIndex((client: any) => client.name === item.client.name);
    if (findIndex > -1) {
      list[findIndex].value += item.product.sale_price;
      list[findIndex].recorrence += 1;
    } else {
      list.push({
        name: item.client.name,
        unity: item.unity.name,
        value: item.product.sale_price,
        recorrence: 1
      });
    }
  });

  resultClients.rankingByValue = list.sort((a: any, b: any) => {
    return a.value + b.value;
  });

  resultClients.rankingByRecorrence = list.sort((a: any, b: any) => {
    return a.recorrence + b.recorrence;
  });

  if (resultClients.rankingByValue.length > 5) {
    resultClients.rankingByValue = resultClients.rankingByValue.slice(0, 5);
  }

  if (resultClients.rankingByRecorrence.length > 5) {
    resultClients.rankingByRecorrence = resultClients.rankingByRecorrence.slice(0, 5);
  }

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
    return a.totalSales + b.totalSales;
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
    return a.quantity + b.quantity;
  });

  resultCarriers.rankingByRegions = listByRegions.sort((a: any, b: any) => {
    return a.quantity + b.quantity;
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
  result.purchases = resultPurchases;
  result.stores = resultStores;
  result.clients = resultClients;
  result.sellers = resultSellers;
  result.carriers = resultCarriers;

  return result;
}
