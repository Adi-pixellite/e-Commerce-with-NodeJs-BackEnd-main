import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { orders, ordersId } from './orders';
import type { products, productsId } from './products';

export interface order_listAttributes {
  orderListId: number;
  orderListProductId: number;
  orderListOrderId: number;
}

export type order_listPk = "orderListId";
export type order_listId = order_list[order_listPk];
export type order_listOptionalAttributes = "orderListId";
export type order_listCreationAttributes = Optional<order_listAttributes, order_listOptionalAttributes>;

export class order_list extends Model<order_listAttributes, order_listCreationAttributes> implements order_listAttributes {
  orderListId!: number;
  orderListProductId!: number;
  orderListOrderId!: number;

  // order_list belongsTo orders via orderListOrderId
  orderListOrder!: orders;
  getOrderListOrder!: Sequelize.BelongsToGetAssociationMixin<orders>;
  setOrderListOrder!: Sequelize.BelongsToSetAssociationMixin<orders, ordersId>;
  createOrderListOrder!: Sequelize.BelongsToCreateAssociationMixin<orders>;
  // order_list belongsTo products via orderListProductId
  orderListProduct!: products;
  getOrderListProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setOrderListProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createOrderListProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof order_list {
    return order_list.init({
    orderListId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orderListProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'productId'
      }
    },
    orderListOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'orderId'
      }
    }
  }, {
    sequelize,
    tableName: 'order_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderListId" },
        ]
      },
      {
        name: "orderListProductId_idx",
        using: "BTREE",
        fields: [
          { name: "orderListProductId" },
        ]
      },
      {
        name: "orderListOrderId_idx",
        using: "BTREE",
        fields: [
          { name: "orderListOrderId" },
        ]
      },
    ]
  });
  }
}
