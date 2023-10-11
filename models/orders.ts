import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { order_list, order_listId } from './order_list';

export interface ordersAttributes {
  orderId: number;
  ordersTotalPrice: number;
  ordersCustomerId: number;
}

export type ordersPk = "orderId";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "orderId";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  orderId!: number;
  ordersTotalPrice!: number;
  ordersCustomerId!: number;

  // orders hasMany order_list via orderListOrderId
  order_lists!: order_list[];
  getOrder_lists!: Sequelize.HasManyGetAssociationsMixin<order_list>;
  setOrder_lists!: Sequelize.HasManySetAssociationsMixin<order_list, order_listId>;
  addOrder_list!: Sequelize.HasManyAddAssociationMixin<order_list, order_listId>;
  addOrder_lists!: Sequelize.HasManyAddAssociationsMixin<order_list, order_listId>;
  createOrder_list!: Sequelize.HasManyCreateAssociationMixin<order_list>;
  removeOrder_list!: Sequelize.HasManyRemoveAssociationMixin<order_list, order_listId>;
  removeOrder_lists!: Sequelize.HasManyRemoveAssociationsMixin<order_list, order_listId>;
  hasOrder_list!: Sequelize.HasManyHasAssociationMixin<order_list, order_listId>;
  hasOrder_lists!: Sequelize.HasManyHasAssociationsMixin<order_list, order_listId>;
  countOrder_lists!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return orders.init({
    orderId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ordersTotalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ordersCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderId" },
        ]
      },
    ]
  });
  }
}
