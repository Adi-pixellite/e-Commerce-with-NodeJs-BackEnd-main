import { Request, Response } from "express";
import Sequelize, { Op } from "sequelize";
import models from "../models/database";
import { products } from "../models/products";
import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt from "bcrypt";
import { sellers } from "../models/sellers";

const saltRounds = 10;

//Get All Products
export const getProducts = async (req: Request, res: Response) => {
  console.log("get product")
  const data = await models.products.findAll({
    attributes: ["productName", "productPrice"],
    include: [
      {
        model: sellers,
        as: "productSeller",
        attributes: ["sellerName"],
      },
    ],
  });
  res.json(data);
};

//Get Product By Search
export const getProductsBySearch = async (req: Request, res: Response) => {
  const searchQuery = req.body.search;
  const searchResult = await models.products.findAll({
    where: {
      productName: {
        [Op.startsWith]: searchQuery,
      },
    },
    attributes: ["productName", "productPrice"],
    include: [
      {
        model: sellers,
        as: "productSeller",
        attributes: ["sellerName"],
      },
    ],
  });

  //Check if No Result Found
  if (searchResult.length > 0) {
    return res.json(searchResult);
  } else {
    return res.json({
      message: " No Search Result Found",
    });
  }
};

//Get Product Within Price Range
export const getProductsByPriceRange = async (req: Request, res: Response) => {
  const low = req.body.low;
  const high = req.body.high;
  const filteredResult = await models.products.findAll({
    where: {
      productPrice: {
        [Op.between]: [low, high], //Both Inclusive
      },
    },
    attributes: ["productName", "productPrice"],
    include: [
      {
        model: sellers,
        as: "productSeller",
        attributes: ["sellerName"],
      },
    ],
  });

  //Check if No Result Found
  if (filteredResult.length > 0) {
    return res.json(filteredResult);
  } else {
    return res.json({
      message: " No Product Found with Given Filters",
    });
  }
};

//Product With Details
export const getProductDetails = async (req: Request, res: Response) => {
  const productID = req.params.ProductID;

  //To Load Product Data
  const ProductDetails = await models.products.findOne({
    where: {
      productId: productID,
    },
    attributes: ["productName", "productPrice"],
    include: [
      {
        model: sellers,
        as: "productSeller",
        attributes: ["sellerName"],
      },
    ],
  });

  //To Load Images
  const images = await models.product_images.findAll({
    where: {
      productImagesProductId: productID,
    },
    attributes: ["productImage"],
  });
  if(ProductDetails != null){
    return res.json({ ProductDetails, images });
  }else{
    return res.json({ message: "No Details Found For Given Product ID" });
  }
};

//ADD Product to Cart
export const addToCart = async (req: Request, res: Response) => {
  const productID = req.body;

  //Get Customer ID From Middleware
  const customer: any = req.customer;
  const customerId = customer.customerId;
  try {
    const addToCart = await models.cart.create({
      cartCustomerId: customerId,
      cartProductId: productID.cartProductId, //productID is an Object
    });
    res.json({
      msg: "Product with ID : " + addToCart.cartId + " Added to Cart",
    });
  } catch {
    return res.json({
      message: "An Error Occured  ",
    });
  }
};

//To GET Customer Cart
export const getCart = async (req: Request, res: Response) => {
  const customer: any = req.customer;
  const customerId = customer.customerId;

  const cartData = await models.cart.findAll({
    where: {
      cartCustomerId: customerId,
    },
    attributes: [],
    include: [
      {
        model: products,
        as: "cartProduct",
        attributes: ["productName", "productPrice", "productAvailableQuantity"],
      },
    ],
  });
  res.json(cartData);
};

//To Register New Customer
export const registerCustomer = async (req: Request, res: Response) => {
  const customerData = req.body;

  const checkIfAlreadyExist = await models.customers.findOne({
    where: {
      customerEmail: customerData.customerEmail,
    },
  });

  if (!checkIfAlreadyExist) {
    //Create Hash
    const hashedPassword = await bcrypt.hash(
      customerData.customerPassword,
      saltRounds
    );

    //Save into DataBase
    const saveCustomerData = await models.customers.create({
      customerFirstName: customerData.customerFirstName,
      customerLastName: customerData.customerLastName,
      customerEmail: customerData.customerEmail,
      customerPassword: hashedPassword,
      customerContactNumber: customerData.customerContactNumber,
    });

    return res.json({
      message: "Welcome :" + saveCustomerData.customerFirstName,
    });
  } else {
    return res.json({
      message: "A User With Given Email Already Registered With Us",
    });
  }
};

//To Login Customer
export const login = async (req: Request, res: Response) => {
  const loginData = req.body;
  const originalData: any = await models.customers.findOne({
    where: {
      customerEmail: loginData.customerEmail,
    },
    raw: true,
  });

  if (originalData == null) {
    return res.json({
      msg: "User Not Exist",
    });
  } else {
    const verify = await bcrypt.compare(
      loginData.customerPassword,
      originalData?.customerPassword
    );

    if (verify) {
      const token = jwt.sign(
        {
          customerId: originalData?.customerId,
          customerEmail: originalData?.customerEmail,
        },
        config.secret,
        {
          expiresIn: "1h",
        }
      );
      console.log(token);
      res.json({ user: originalData, token: token });
    } else {
      res.json({
        message: "invalid Password",
      });
    }
  }
};

//to Get Total Price of Cart
export const getCartTotal = async (req: Request, res: Response) => {
  const customer: any = req.customer;
  const customerId = customer.customerId;

  const cartTotal: any = await models.cart.findAll({
    where: {
      cartCustomerId: customerId,
    },
    attributes: [],
    raw: true,
    include: [
      {
        model: products,
        as: "cartProduct",

        attributes: [
          [Sequelize.fn("SUM", Sequelize.col("productPrice")), "total_cost"],
        ],
      },
    ],
  });
  // console.log(cartTotal[0].cartProduct.fn.total_cost);

  return res.json(cartTotal);
};

export const makeOrder = async (req: Request, res: Response) => {
  let product: any;

  //Get Customer ID From Middleware
  const customer: any = req.customer;
  const customerId = customer.customerId;

  //For Cart Total price
  const cartTotal: any = await models.cart.findAll({
    where: {
      cartCustomerId: customerId,
    },
    raw: true,
    include: [
      {
        model: products,
        as: "cartProduct",
        attributes: [
          [Sequelize.fn("SUM", Sequelize.col("productPrice")), "total_cost"],
        ],
      },
    ],
  });

  //Get All Cart Entries With Target CustomerID
  const cartData = await models.cart.findAll({
    where: {
      cartCustomerId: customerId,
    },
  });

  const cartLength = cartData.length;

  for (let i = 0; i < cartLength; i++) {
    //To Get Available-Product-Quantity Before Making Order Request
    product = await models.products.findOne({
      where: {
        productId: cartData[i].cartProductId,
      },
    });
    console.log("p :" + product);
    //If Product is Not Available
    if (product.productAvailableQuantity == 0) {
      return res.json({
        message:
          "Product with Product Id " +
          cartData[i].cartProductId +
          " Is Unavailable",
      });
    }
  }

  //CHECK : if Customer Has any Product in his/her Cart or Not
  if (cartLength < 1) {
    return res.json({
      message: "Your Cart Is Empty",
    });
  }

  const orderData = await models.orders.create({
    ordersCustomerId: customerId,
    ordersTotalPrice: cartTotal[0]["cartProduct.total_cost"],
  });

  //Transfer Customer Cart To Order Table
  for (let i = 0; i < cartLength; i++) {
    await models.order_list.create({
      orderListProductId: cartData[i].cartProductId,
      orderListOrderId: orderData.orderId,
    });
  }

  //Delete Customer Cart Data
  for (let i = 0; i < cartLength; i++) {
    await models.cart.destroy({
      where: {
        // cartCustomerId :customersIdU
        cartCustomerId: customerId,
      },
    });
  }

  //To Update Available Product Quantity
  for (let i = 0; i < cartLength; i++) {
    //To Update Particular Products's Available Quantity
    await models.products.update(
      {
        productAvailableQuantity: product?.productAvailableQuantity - 1,
      },
      {
        where: {
          productId: cartData[i].cartProductId,
        },
      }
    );
  }

  res.json({ cartTotal, orderData });
};

//Get All Orders
export const getOrders = async (req: Request, res: Response) => {
  //Get Customer ID From Middleware
  const customer: any = req.customer;
  const customerId = customer.customerId;

  const orderData = await models.orders.findAll({
    where: {
      ordersCustomerId: customerId,
    },
  });
  res.json(orderData);
};
