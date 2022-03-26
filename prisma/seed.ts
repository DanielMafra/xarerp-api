import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  const store = await prisma.store.create({
    data: {
      name: "Store Name",
      type: "Matriz"
    }
  });

  const user = await prisma.user.create({
    data: {
      name: "User",
      email: "user@mail.com",
      password: "$2a$10$zqgAMD5bVH5nnaN0NV7V6eYUjweRi4I7h1am3GpIwCAYrnWCuG4vO",
      unity_id: store.id,
      position: "Administrador",
      permissions: "view_dashboard,view_financial,create_carrier,view_carrier,update_carrier,delete_carrier,create_category,view_category,update_category,delete_category,create_client,view_client,update_client,delete_client,create_register,view_register,update_register,delete_register,create_product,view_product,update_product,delete_product,create_provider,view_provider,update_provider,delete_provider,create_purchase,view_purchase,update_purchase,delete_purchase,create_sale,view_sale,update_sale,delete_sale,create_seller,view_seller,update_seller,delete_seller,create_store,view_store,update_store,delete_store,create_ticket,view_ticket,update_ticket,delete_ticket,create_user,view_user,update_user,delete_user",
      active: true
    }
  });
}

main();