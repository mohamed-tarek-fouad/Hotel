import { Router } from "express";
import * as CheckOutRoomsService from "../services/checkedoutRooms/index.js";
import authenticateWithJWT from "../helpers/functions/authenticateWithJWT.js";
import JoiMiddleware from "../helpers/middlewares/joiMiddleware.js";
import checkOutSchema from "../helpers/schemas/checkOut.schema.js";
const ordersRouter = Router();

ordersRouter.post(
  "/",
  JoiMiddleware(checkOutSchema),
  authenticateWithJWT,
  CheckOutRoomsService.createCheckOutRoom
);
ordersRouter.get("/", authenticateWithJWT, CheckOutRoomsService.getChekOuts);
ordersRouter.get(
  "/:id",
  authenticateWithJWT,
  CheckOutRoomsService.getCheckOutId
);

export default ordersRouter;
