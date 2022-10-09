import { Router } from "express";
import * as reservedRoomService from "../services/reservedRooms/index.js";
import authenticateWithJWT from "../helpers/functions/authenticateWithJWT.js";
import JoiMiddleware from "../helpers/middlewares/joiMiddleware.js";
import reservedRoomSchema from "../helpers/schemas/reservedRoom.schema.js";
import updateReservedRoomSchema from "../helpers/schemas/updateReservation.schema.js";
const ordersRouter = Router();

ordersRouter.post(
  "/",
  JoiMiddleware(reservedRoomSchema),
  authenticateWithJWT,
  reservedRoomService.createReservedRoom
);
ordersRouter.get(
  "/",
  authenticateWithJWT,
  reservedRoomService.getReservedRooms
);
ordersRouter.get(
  "/:id",
  authenticateWithJWT,
  reservedRoomService.getReservedroomId
);
ordersRouter.patch(
  "/:id",
  JoiMiddleware(updateReservedRoomSchema),
  authenticateWithJWT,
  reservedRoomService.updateReservation
);
ordersRouter.delete(
  "/:id",
  authenticateWithJWT,
  reservedRoomService.cancelReservation
);

export default ordersRouter;
