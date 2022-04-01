import { prisma } from "../../../database/prismaClient";

export const getDashboardService = {

  //SALES
  findSales: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        product: {
          select: {
            purchase_price: true,
            sale_price: true,
            name: true,
          }
        },
        updated_at: true
      },
      orderBy: {
        updated_at: 'asc'
      }
    });
  },

  findLastSales: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        product: {
          select: {
            sale_price: true,
            name: true
          }
        },
        unity: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        updated_at: 'desc'
      },
      take: 15
    })
  },

  //PRODUCTS
  findProducts: async (quantity: number) => {
    return await prisma.product.findMany({
      select: {
        purchase_price: true,
        sale_price: true,
        name: true,
        sold_amount: true,
        updated_at: true
      },
      orderBy: {
        sold_amount: 'desc'
      },
      take: quantity
    });
  },

  //FINANCIAL
  findFinancial: async (minDate: string) => {
    return await prisma.financial.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        type: true,
        value: true,
        updated_at: true
      },
      orderBy: {
        updated_at: 'asc'
      }
    });
  },

  //PURCHASES
  findPurchases: async (minDate: string) => {
    return await prisma.purchase.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        quantity: true,
        unit_price: true,
        updated_at: true
      }
    });
  },

  //STORES
  findSalesDefaultStore: async (minDate: string, typeStore: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        },
        unity: {
          type: typeStore
        }
      },
      select: {
        product: {
          select: {
            purchase_price: true,
            sale_price: true,
            updated_at: true
          }
        }
      }
    });
  },
  findSalesOtherStores: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        },
        NOT: {
          unity: {
            type: 'Matriz'
          }
        }
      },
      select: {
        product: {
          select: {
            purchase_price: true,
            sale_price: true
          }
        },
        unity: {
          select: {
            type: true,
            name: true,
          }
        }
      }
    });
  },

  //CLIENTS
  findClients: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        client: {
          select: {
            name: true
          }
        },
        unity: {
          select: {
            name: true
          }
        },
        product: {
          select: {
            sale_price: true
          }
        }
      }
    });
  },

  //SELLERS
  findSellers: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
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
        }
      }
    });
  },

  //CARRIERS
  findCarriers: async (minDate: string) => {
    return await prisma.sale.findMany({
      where: {
        updated_at: {
          gte: new Date(minDate)
        }
      },
      select: {
        carrier: {
          select: {
            name: true,
            region: true
          }
        },
      }
    });
  },
}
