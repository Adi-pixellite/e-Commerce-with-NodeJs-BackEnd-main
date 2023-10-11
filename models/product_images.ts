import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { products, productsId } from './products';

export interface product_imagesAttributes {
  productImagesId: number;
  productImage: string;
  productImagesProductId: number;
}

export type product_imagesPk = "productImagesId";
export type product_imagesId = product_images[product_imagesPk];
export type product_imagesOptionalAttributes = "productImagesId";
export type product_imagesCreationAttributes = Optional<product_imagesAttributes, product_imagesOptionalAttributes>;

export class product_images extends Model<product_imagesAttributes, product_imagesCreationAttributes> implements product_imagesAttributes {
  productImagesId!: number;
  productImage!: string;
  productImagesProductId!: number;

  // product_images belongsTo products via productImagesProductId
  productImagesProduct!: products;
  getProductImagesProduct!: Sequelize.BelongsToGetAssociationMixin<products>;
  setProductImagesProduct!: Sequelize.BelongsToSetAssociationMixin<products, productsId>;
  createProductImagesProduct!: Sequelize.BelongsToCreateAssociationMixin<products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof product_images {
    return product_images.init({
    productImagesId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productImage: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    productImagesProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'productId'
      }
    }
  }, {
    sequelize,
    tableName: 'product_images',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productImagesId" },
        ]
      },
      {
        name: "productImagesProductId_idx",
        using: "BTREE",
        fields: [
          { name: "productImagesProductId" },
        ]
      },
    ]
  });
  }
}
