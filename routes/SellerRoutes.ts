import express from 'express';
import * as sellerControllers from "../controllers/SellerControllers"
import authMiddleware from "../middleware/checkAuth";
import sellerMiddleWare from "../middleware/getSeller";

const router = express.Router()

router.post(`/RegisterSeller`, sellerControllers.registerSeller);

router.post(`/LoginSeller`, sellerControllers.loginSeller);

router.post(`/AddProduct`, authMiddleware, sellerMiddleWare, sellerControllers.addProduct);

router.post(`/UpdateProduct/:ProductID`, authMiddleware, sellerMiddleWare, sellerControllers.upDateProduct);

router.post(`/DeleteProduct/:ProductID`, authMiddleware, sellerMiddleWare, sellerControllers.deleteProduct);


export default router;