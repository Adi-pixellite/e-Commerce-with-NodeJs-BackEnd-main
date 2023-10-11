import { Request, Response } from "express";
import models from "../models/database";
import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt from "bcrypt";
const saltRounds = 10;

//To Register New Seller
export const registerSeller = async (req: Request, res: Response) => {
  const sellerData = req.body;

  const checkIfAlreadyExist = await models.sellers.findOne({
    where: {
      sellerEmail: sellerData.sellerEmail,
    },
  });

  if (!checkIfAlreadyExist) {
    //Create Hash
    const hashedPassword = await bcrypt.hash(
      sellerData.sellerPassword,
      saltRounds
    );

    //Save into DataBase
   const saveSellerData = await models.sellers.create({
    sellerName: sellerData.sellerName,
    sellerEmail: sellerData.sellerEmail,
    sellerPassword: hashedPassword,
    sellerAddress: sellerData.sellerAddress,
  });

    return res.json({
      message: "Welcome :" + saveSellerData.sellerName,
    });
  } else {
    return res.json({
      message: "A Seller With Given Email Already Registered With Us",
    });
  }
};

// //To Login Seller
export const loginSeller = async (req: Request, res: Response) => {
  const loginData = req.body;

  const originalData: any = await models.sellers.findOne({
    where: {
      sellerEmail: loginData.sellerEmail,
    },
    raw: true,
  });
  
  console.log(originalData)

  const verify = await bcrypt.compare(
    loginData.sellerPassword,
    originalData?.sellerPassword
  );

  if (verify) {
    const token = jwt.sign(
      {
        sellerId: originalData?.sellerId,
        sellerEmail: originalData?.sellerEmail,
      },
      config.secret,
      {
        expiresIn: "1h",
      }
    );
    res.json({ LoggedInSeller: originalData, token: token });
  } else {
    res.json({
      message: "invalid Email or Password ",
    });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  //Get Seller ID From Middleware
  const seller: any = req.seller;
  const sellerId = seller.sellerId;

  const savedProductData = await models.products.create({
    productName: productData.productName,
    productPrice: productData.productPrice,
    productAvailableQuantity: productData.productAvailableQuantity,
    productSellerId: sellerId,
  });
  res.json({
    savedProductData,
  });
};

export const upDateProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const targetProductID = req.params.ProductID;

  //Get Seller ID From Middleware
  const seller: any = req.seller;
  const sellerId = seller.sellerId;

  const targeProduct = await models.products.findByPk(targetProductID);

  //Check if LoggedIn Seller Owns That Targeted Product or Not
  if (targeProduct?.productSellerId == sellerId) {
    await models.products.update(
      {
        productName: productData.productName,
        productPrice: productData.productPrice,
        productAvailableQuantity: productData.productAvailableQuantity,
        productSellerId: sellerId,
      },
      {
        where: {
          productId: targetProductID,
        },
      }
    );
    return res.json({
      message: "Product Updated Succesfully",
    });
  } else {
    return res.json({
      message: "You Have No Product With Product ID : " + targetProductID + " ",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const targetProductID = req.params.ProductID;

  //Get Seller ID From Middleware
  const seller: any = req.seller;
  const sellerId = seller.sellerId;
  //console.log(targetProductID);
  
  //Target Product Data
  const productToBeDeleted = await models.products.findOne({
    where: {
      productId: targetProductID,
    },
  });

  //Check if LoggedIn Seller Owns That Targeted Product or Not
  if (productToBeDeleted?.productSellerId == sellerId) {
    //To Delete Targeted Product Related Images
    await models.product_images.destroy({
      where: {
        productImagesProductId: targetProductID,
      },
    });

    //To Delete Targeted Product
    await models.products.destroy({
      where: {
        productId: targetProductID,
      },
    });
    return res.json({
      message: "Product Deleted Succesfully",
    });
  } else {
    return res.json({
      message: "You Have No Product With Product ID : " + targetProductID + " ",
    });
  }
};
