import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';

export interface orders_product_listAttributes {
  ordersListId: number;
  ordersListProductId: number;
}

export type orders_product_listPk = "ordersListId";
export type orders_product_listId = orders_product_list[orders_product_listPk];
export type orders_product_listOptionalAttributes = "ordersListId";
export type orders_product_listCreationAttributes = Optional<orders_product_listAttributes, orders_product_listOptionalAttributes>;

export class orders_product_list extends Model<orders_product_listAttributes, orders_product_listCreationAttributes> implements orders_product_listAttributes {
  ordersListId!: number;
  ordersListProductId!: number;

  // orders_product_list belongsTo products via ordersListProductId
  ordersListProduct!: products;
  getOrdersListProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setOrdersListProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createOrdersListProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof orders_product_list {
    return orders_product_list.init({
    ordersListId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ordersListProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'productsId'
      }
    }
  }, {
    sequelize,
    tableName: 'orders_product_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ordersListId" },
        ]
      },
      {
        name: "ordersListProductId_idx",
        using: "BTREE",
        fields: [
          { name: "ordersListProductId" },
        ]
      },
    ]
  });
  }
}
