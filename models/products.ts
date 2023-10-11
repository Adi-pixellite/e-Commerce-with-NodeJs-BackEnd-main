import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { cart, cartId } from './cart';
import type { order_list, order_listId } from './order_list';
import type { product_images, product_imagesId } from './product_images';
import type { sellers, sellersId } from './sellers';

export interface productsAttributes {
  productId: number;
  productName: string;
  productPrice: number;
  productAvailableQuantity: number;
  productSellerId: number;
}

export type productsPk = "productId";
export type productsId = products[productsPk];
export type productsOptionalAttributes = "productId";
export type productsCreationAttributes = Optional<productsAttributes, productsOptionalAttributes>;

export class products extends Model<productsAttributes, productsCreationAttributes> implements productsAttributes {
  productId!: number;
  productName!: string;
  productPrice!: number;
  productAvailableQuantity!: number;
  productSellerId!: number;

  // products hasMany cart via cartProductId
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
  // products hasMany order_list via orderListProductId
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
  // products hasMany product_images via productImagesProductId
  product_images!: product_images[];
  getProduct_images!: Sequelize.HasManyGetAssociationsMixin<product_images>;
  setProduct_images!: Sequelize.HasManySetAssociationsMixin<product_images, product_imagesId>;
  addProduct_image!: Sequelize.HasManyAddAssociationMixin<product_images, product_imagesId>;
  addProduct_images!: Sequelize.HasManyAddAssociationsMixin<product_images, product_imagesId>;
  createProduct_image!: Sequelize.HasManyCreateAssociationMixin<product_images>;
  removeProduct_image!: Sequelize.HasManyRemoveAssociationMixin<product_images, product_imagesId>;
  removeProduct_images!: Sequelize.HasManyRemoveAssociationsMixin<product_images, product_imagesId>;
  hasProduct_image!: Sequelize.HasManyHasAssociationMixin<product_images, product_imagesId>;
  hasProduct_images!: Sequelize.HasManyHasAssociationsMixin<product_images, product_imagesId>;
  countProduct_images!: Sequelize.HasManyCountAssociationsMixin;
  // products belongsTo sellers via productSellerId
  productSeller!: sellers;
  getProductSeller!: Sequelize.BelongsToGetAssociationMixin<sellers>;
  setProductSeller!: Sequelize.BelongsToSetAssociationMixin<sellers, sellersId>;
  createProductSeller!: Sequelize.BelongsToCreateAssociationMixin<sellers>;

  static initModel(sequelize: Sequelize.Sequelize): typeof products {
    return products.init({
    productId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productName: {
      type: DataTypes.STRING(105),
      allowNull: false
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productAvailableQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productSellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sellers',
        key: 'sellerId'
      }
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
      {
        name: "productsSellerId_idx",
        using: "BTREE",
        fields: [
          { name: "productSellerId" },
        ]
      },
    ]
  });
  }
}
