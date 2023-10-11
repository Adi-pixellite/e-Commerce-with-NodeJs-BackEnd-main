import { NextFunction, Request, Response } from "express";
import jwt_decode from "jwt-decode";

async function sellerMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    //Decoding Seller Data (ID and Email) from Auth Token
    const Token: any = req.headers.authorization;
    req.seller = jwt_decode(Token);
    next();

  } catch (error) {
    return res.json({
      msg: "Invalid Token",
    });
  }
}

export default sellerMiddleWare;
