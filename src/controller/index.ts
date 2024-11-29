import { login } from "./auth/login.controller";
import { updateAddress } from "./common/addAddress.controler";
import { createOrder } from "./common/createOrder.controller";
import { createProduct } from "./common/createProduct.controller";
import { getCommerce } from "./common/getCommerce.controller";
import { getOrdersByCommerce } from "./common/getOrderByCommerce.controller";
import { getOrdersByUser } from "./common/getOrderByUser.controller";
import { getProductByName } from "./common/getProduct.controller";
import { getProductsByCommerce } from "./common/getProductsByCommerce.controller";
import { getUser } from "./common/getUser.controller";
import { updateCommerce } from "./common/updateCommerce.controller";
import { updateOrder } from "./common/updateOrder.controller";
import { updateProduct } from "./common/updateProduct.controller";

export {
  createOrder,
  createProduct,
  getCommerce,
  getOrdersByCommerce,
  getOrdersByUser,
  getProductByName,
  getProductsByCommerce,
  getUser,
  login,
  updateAddress,
  updateCommerce,
  updateOrder,
  updateProduct,
};
