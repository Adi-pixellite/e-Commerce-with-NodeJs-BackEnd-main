import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';

export interface sellersAttributes {
  sellerId: number;
  sellerName: string;
  sellerEmail: string;
  sellerPassword: string;
  sellerAddress: string;
}

export type sellersPk = "sellerId";
export type sellersId = sellers[sellersPk];
export type sellersOptionalAttributes = "sellerId";
export type sellersCreationAttributes = Optional<sellersAttributes, sellersOptionalAttributes>;

export class sellers extends Model<sellersAttributes, sellersCreationAttributes> implements sellersAttributes {
  sellerId!: number;
  sellerName!: string;
  sellerEmail!: string;
  sellerPassword!: string;
  sellerAddress!: string;

  // sellers hasMany products via productSellerId
  products!: products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<products, productsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<products, productsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<products, productsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<products, productsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<products, productsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<products, productsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<products, productsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof sellers {
    return sellers.init({
    sellerId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sellerName: {
      type: DataTypes.STRING(105),
      allowNull: false
    },
    sellerEmail: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    sellerPassword: {
      type: DataTypes.STRING(405),
      allowNull: false
    },
    sellerAddress: {
      type: DataTypes.STRING(105),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sellers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sellerId" },
        ]
      },
    ]
  });
  }
}
