import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { customers, customersId } from './customers';
import type { products, productsId } from './products';

export interface cartAttributes {
  cartId: number;
  cartCustomerId: number;
  cartProductId: number;
}

export type cartPk = "cartId";
export type cartId = cart[cartPk];
export type cartOptionalAttributes = "cartId";
export type cartCreationAttributes = Optional<cartAttributes, cartOptionalAttributes>;

export class cart extends Model<cartAttributes, cartCreationAttributes> implements cartAttributes {
  cartId!: number;
  cartCustomerId!: number;
  cartProductId!: number;

  // cart belongsTo customers via cartCustomerId
  cartCustomer!: customers;
  getCartCustomer!: Sequelize.BelongsToGetAssociationMixin<customers>;
  setCartCustomer!: Sequelize.BelongsToSetAssociationMixin<customers, customersId>;
  createCartCustomer!: Sequelize.BelongsToCreateAssociationMixin<customers>;
  // cart belongsTo products via cartProductId
  cartProduct!: products;
  getCartProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setCartProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createCartProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof cart {
    return cart.init({
    cartId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cartCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'customerId'
      }
    },
    cartProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'productId'
      }
    }
  }, {
    sequelize,
    tableName: 'cart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cartId" },
        ]
      },
      {
        name: "cartCustomerId_idx",
        using: "BTREE",
        fields: [
          { name: "cartCustomerId" },
        ]
      },
      {
        name: "cartProductId_idx",
        using: "BTREE",
        fields: [
          { name: "cartProductId" },
        ]
      },
    ]
  });
  }
}
