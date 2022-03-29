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

  result.sales = resultSales;

  return result;
}

/*

import { prisma } from "../../../database/prismaClient";

export const getSaleService = {

  findAll: async () => {
    return await prisma.sale.findMany({});
  },

  findOne: async (id: string) => {
    return await prisma.sale.findUnique({
      where: { id }
    });
  },

  //list with pagination
  listAll: async (name: string, page: number) => {
    return await prisma.$transaction([
      prisma.sale.count({
        where: {
          product: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        }
      }),
      prisma.sale.findMany({
        where: {
          product: {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          }
        },
        include: {
          product: {
            select: {
              name: true,
              description: true
            }
          },
          seller: {
            select: {
              user: {
                select: {
                  name: true
                }
              }
            }
          },
          unity: {
            select: {
              name: true
            }
          },
          client: {
            select: {
              name: true,
              city: true,
              state: true
            }
          },
          carrier: {
            select: {
              name: true,
            }
          }
        },
        skip: page * 10,
        take: 10,
        orderBy: {
          updated_at: 'desc'
        }
      })
    ]);
  },

}


*/

/*

import { Request, Response } from 'express';
import { getSaleService } from '../services/getSaleService';

export const getAll = async (req: Request, res: Response) => {
  try {
    const { page, q } = req.query;

    const sales = await getSaleService.listAll(String(q), Number(page));

    if (!sales) {
      return res.status(404).json({ error: 'Not found' });
    }

    let newArray = [];
    let returnedSales = [];
    returnedSales.push(sales[0]);

    for (let i = 0; i < sales[1].length; i++) {
      newArray.push({
        id: sales[1][i].id,
        product_id: sales[1][i].product_id,
        product_name: sales[1][i].product.name,
        product_description: sales[1][i].product.description,
        unity_id: sales[1][i].unity_id,
        unity: sales[1][i].unity.name,
        client_id: sales[1][i].client_id,
        client_name: sales[1][i].client.name,
        client_city: sales[1][i].client.city,
        client_state: sales[1][i].client.state,
        seller_id: sales[1][i].seller_id,
        seller: sales[1][i].seller.user.name,
        carrier_id: sales[1][i].carrier_id,
        carrier: sales[1][i].carrier.name,
        status: sales[1][i].status,
        created_at: sales[1][i].created_at,
        updated_at: sales[1][i].updated_at,
      })
    }

    returnedSales.push(newArray);

    return res.status(200).json({ sales: returnedSales });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}

*/
