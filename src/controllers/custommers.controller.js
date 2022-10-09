import { Router } from "express";
import * as custommersService from "../services/custommers/index.js";
import authenticateWithJWT from "../helpers/functions/authenticateWithJWT.js";
import JoiMiddleware from "../helpers/middlewares/joiMiddleware.js";
import custommerSchema from "../helpers/schemas/custommer.schema.js";
const ordersRouter = Router();

ordersRouter.post(
  "/",
  JoiMiddleware(custommerSchema),
  authenticateWithJWT,
  custommersService.createCustommer
);
ordersRouter.get("/", authenticateWithJWT, custommersService.getCustommers);
ordersRouter.get("/:id", authenticateWithJWT, custommersService.getCustommerId);
ordersRouter.put(
  "/:id",
  JoiMiddleware(custommerSchema),
  authenticateWithJWT,
  custommersService.editCustommer
);

export default ordersRouter;
