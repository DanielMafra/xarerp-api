import { Request, Response } from 'express';
import { createUserService } from '../services/createUserService';
import { getUserService } from '../services/getUserService';
import { getStoreService } from '../../stores/services/getStoreService';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email, unity, position } = req.body;
    const password = '1234';

    if (!name || !email || !unity || !position) {
      return res.status(400).json({ error: 'Incomplete data' });
    }

    const hasStore = await getStoreService.findOne(unity);

    if (!hasStore) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const hasUserByEmail = await getUserService.findByEmail(email);

    if (hasUserByEmail.length > 0) {
      return res.status(400).json({ error: 'E-mail already exists' });
    }

    const defaultRoles = ['view_dashboard'];
    const storeRoles = ['view_store', 'create_store', 'update_store', 'delete_store'];
    const productRoles = ['view_product', 'create_product', 'update_product', 'delete_product'];
    const clientRoles = ['view_client', 'create_client', 'update_client', 'delete_client'];
    const saleRoles = ['view_sale', 'create_sale', 'update_sale', 'delete_sale'];
    const carrierRoles = ['view_carrier', 'create_carrier', 'update_carrier', 'delete_carrier'];
    const providerRoles = ['view_provider', 'create_provider', 'update_provider', 'delete_provider'];
    const sellerRoles = ['view_seller', 'create_seller', 'update_seller', 'delete_seller'];
    const purchaseRoles = ['view_purchase', 'create_purchase', 'update_purchase', 'delete_purchase'];
    const financialRoles = ['view_financial', 'create_financial', 'update_financial', 'delete_financial'];
    const userRoles = ['view_user', 'create_user', 'update_user', 'delete_user'];
    const ticketRoles = ['view_ticket', 'create_ticket', 'update_ticket', 'delete_ticket'];
    const categoryRoles = ['create_category', 'view_category'];

    const administrationCanGets = ['get_stores', 'get_categories', 'get_providers', 'get_products', 'get_clients', 'get_sellers', 'get_carriers', 'get_users'];
    const financialCanGets = ['get_stores'];
    const saleCanGets = ['get_stores', 'get_products', 'get_clients', 'get_sellers', 'get_carriers'];
    const depositCanGets = ['get_categories', 'get_stores', 'get_providers', 'get_products'];

    const adminPermissions = [...defaultRoles, ...storeRoles, ...productRoles, ...clientRoles, ...saleRoles, ...carrierRoles, ...providerRoles, ...sellerRoles, ...purchaseRoles, ...financialRoles, ...userRoles, ...ticketRoles, ...categoryRoles, ...administrationCanGets];

    const finanPermissions = [...defaultRoles, ...financialRoles, ...ticketRoles, ...financialCanGets];

    const sellerPermissions = [...defaultRoles, ...clientRoles, ...saleRoles, ...ticketRoles, ...saleCanGets];

    const stockPermissions = [...defaultRoles, ...productRoles, ...providerRoles, ...purchaseRoles, ...ticketRoles, ...categoryRoles, ...depositCanGets];

    let userPermissions = '';

    switch (position) {
      case 'Administração':
        userPermissions = adminPermissions.join(',');
        break;
      case 'Financeiro':
        userPermissions = finanPermissions.join(',');
        break;
      case 'Vendas':
        userPermissions = sellerPermissions.join(',');
        break;
      case 'Depósito':
        userPermissions = stockPermissions.join(',');
        break;
    }

    const hashPassword = await hash(password, 10);

    const user = await createUserService.create({
      id: uuidV4(),
      name,
      email,
      password: hashPassword,
      unity,
      position,
      permissions: userPermissions,
      active: true
    });

    if (!user) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(201).json({ user });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'InternalServerError' });
  }
}
