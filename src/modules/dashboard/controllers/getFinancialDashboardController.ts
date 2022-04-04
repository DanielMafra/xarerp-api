import { getFinancialDashboardService } from '../services/getFinancialDashboardService';
import { formatDate } from '../../../utils/dateFormat';
import { DashboardProps } from "../../../types/DashboardProps";

type FinancialData = {
  date: string;
  positive: number;
  negative: number;
}

export const getFinancialDashboardController = async ({ targetDate, days, currentDateTime, incrementerDay }: DashboardProps): Promise<any> => {
  const getFinancial = await getFinancialDashboardService.findFinancial(targetDate!);
  let arrayDatesFinancial: any[] = [];

  for (let i = 0; i < days!; i++) {
    arrayDatesFinancial.push({
      date: formatDate(new Date(currentDateTime! + (incrementerDay! * i))),
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

  return resultFinancial;
}