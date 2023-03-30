import { Router } from "express";

import { getProducts, createProduct } from "../controllers/product.js";
import auth from "../middleware/auth.js";

const productRouter = Router();

productRouter.post("/", auth, createProduct);
productRouter.get("/", auth, getProducts);

export default productRouter;
