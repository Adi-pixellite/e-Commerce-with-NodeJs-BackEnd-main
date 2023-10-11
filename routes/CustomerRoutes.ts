import express from 'express';
import * as CustomerControllers from "../controllers/CustomerControllers";
import authMiddleware from "../middleware/checkAuth";
import customerMiddleWare from "../middleware/getCustomer";

const router = express.Router()

router.get(`/Index`, CustomerControllers.getProducts);

router.get(`/Search`, CustomerControllers.getProductsBySearch);

router.get(`/ProductsPriceFilter`, CustomerControllers.getProductsByPriceRange);

router.get(`/Product/:ProductID`, CustomerControllers.getProductDetails);

router.post(`/AddToCart`,authMiddleware, customerMiddleWare, CustomerControllers.addToCart);

router.get(`/GetCart`,authMiddleware, customerMiddleWare, CustomerControllers.getCart);

router.post(`/CustomerLogin` , CustomerControllers.login)

router.post(`/RegisterCustomer`, CustomerControllers.registerCustomer)

router.post(`/MakeOrder`,authMiddleware, customerMiddleWare,  CustomerControllers.makeOrder);

router.get(`/CartTotal`,authMiddleware, customerMiddleWare, CustomerControllers.getCartTotal);

router.get(`/Orders`,authMiddleware, customerMiddleWare, CustomerControllers.getOrders);

export default router;