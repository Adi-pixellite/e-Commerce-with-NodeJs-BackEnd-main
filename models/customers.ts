import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cart, cartId } from './cart';

export interface customersAttributes {
  customerId: number;
  customerFirstName: string;
  customerEmail: string;
  customerPassword: string;
  customerContactNumber: string;
  customerLastName: string;
}

export type customersPk = "customerId";
export type customersId = customers[customersPk];
export type customersOptionalAttributes = "customerId";
export type customersCreationAttributes = Optional<customersAttributes, customersOptionalAttributes>;

export class customers extends Model<customersAttributes, customersCreationAttributes> implements customersAttributes {
  customerId!: number;
  customerFirstName!: string;
  customerEmail!: string;
  customerPassword!: string;
  customerContactNumber!: string;
  customerLastName!: string;

  // customers hasMany cart via cartCustomerId
  carts!: cart[];
  getCarts!: Sequelize.HasManyGetAssociationsMixin<cart>;
  setCarts!: Sequelize.HasManySetAssociationsMixin<cart, cartId>;
  addCart!: Sequelize.HasManyAddAssociationMixin<cart, cartId>;
  addCarts!: Sequelize.HasManyAddAssociationsMixin<cart, cartId>;
  createCart!: Sequelize.HasManyCreateAssociationMixin<cart>;
  removeCart!: Sequelize.HasManyRemoveAssociationMixin<cart, cartId>;
  removeCarts!: Sequelize.HasManyRemoveAssociationsMixin<cart, cartId>;
  hasCart!: Sequelize.HasManyHasAssociationMixin<cart, cartId>;
  hasCarts!: Sequelize.HasManyHasAssociationsMixin<cart, cartId>;
  countCarts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof customers {
    return customers.init({
    customerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customerFirstName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    customerEmail: {
      type: DataTypes.STRING(105),
      allowNull: false
    },
    customerPassword: {
      type: DataTypes.STRING(105),
      allowNull: false
    },
    customerContactNumber: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    customerLastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'customers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customerId" },
        ]
      },
    ]
  });
  }
}
