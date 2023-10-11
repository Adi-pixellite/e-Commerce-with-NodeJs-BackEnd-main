import type { Sequelize } from "sequelize";
import { cart as _cart } from "./cart";
import type { cartAttributes, cartCreationAttributes } from "./cart";
import { customers as _customers } from "./customers";
import type { customersAttributes, customersCreationAttributes } from "./customers";
import { order_list as _order_list } from "./order_list";
import type { order_listAttributes, order_listCreationAttributes } from "./order_list";
import { orders as _orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { product_images as _product_images } from "./product_images";
import type { product_imagesAttributes, product_imagesCreationAttributes } from "./product_images";
import { products as _products } from "./products";
import type { productsAttributes, productsCreationAttributes } from "./products";
import { sellers as _sellers } from "./sellers";
import type { sellersAttributes, sellersCreationAttributes } from "./sellers";

export {
  _cart as cart,
  _customers as customers,
  _order_list as order_list,
  _orders as orders,
  _product_images as product_images,
  _products as products,
  _sellers as sellers,
};

export type {
  cartAttributes,
  cartCreationAttributes,
  customersAttributes,
  customersCreationAttributes,
  order_listAttributes,
  order_listCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  product_imagesAttributes,
  product_imagesCreationAttributes,
  productsAttributes,
  productsCreationAttributes,
  sellersAttributes,
  sellersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const cart = _cart.initModel(sequelize);
  const customers = _customers.initModel(sequelize);
  const order_list = _order_list.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const product_images = _product_images.initModel(sequelize);
  const products = _products.initModel(sequelize);
  const sellers = _sellers.initModel(sequelize);

  cart.belongsTo(customers, { as: "cartCustomer", foreignKey: "cartCustomerId"});
  customers.hasMany(cart, { as: "carts", foreignKey: "cartCustomerId"});
  order_list.belongsTo(orders, { as: "orderListOrder", foreignKey: "orderListOrderId"});
  orders.hasMany(order_list, { as: "order_lists", foreignKey: "orderListOrderId"});
  cart.belongsTo(products, { as: "cartProduct", foreignKey: "cartProductId"});
  products.hasMany(cart, { as: "carts", foreignKey: "cartProductId"});
  order_list.belongsTo(products, { as: "orderListProduct", foreignKey: "orderListProductId"});
  products.hasMany(order_list, { as: "order_lists", foreignKey: "orderListProductId"});
  product_images.belongsTo(products, { as: "productImagesProduct", foreignKey: "productImagesProductId"});
  products.hasMany(product_images, { as: "product_images", foreignKey: "productImagesProductId"});
  products.belongsTo(sellers, { as: "productSeller", foreignKey: "productSellerId"});
  sellers.hasMany(products, { as: "products", foreignKey: "productSellerId"});

  return {
    cart: cart,
    customers: customers,
    order_list: order_list,
    orders: orders,
    product_images: product_images,
    products: products,
    sellers: sellers,
  };
}
