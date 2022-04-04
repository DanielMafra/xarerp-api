import { formatDate } from "../utils/dateFormat";

//===============
import { getSalesDashboardController } from '../modules/dashboard/controllers/getSalesDashboardController';
import { getProductsDashboardController } from "../modules/dashboard/controllers/getProductsDashboardController";
import { getFinancialDashboardController } from "../modules/dashboard/controllers/getFinancialDashboardController";
import { getStoresDashboardController } from "../modules/dashboard/controllers/getStoresDashboardController";
//===============

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
  const getFinancial = await getFinancialDashboardController(targetDate, days);
  const getStores = await getStoresDashboardController(targetDate);
  //======

  //RESULTS
  result.sales = getSales;
  result.products = getProducts;
  result.financial = getFinancial;
  result.stores = getStores;

  return result;
}
