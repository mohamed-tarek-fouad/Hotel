import { Router } from "express";
import * as roomService from "../services/rooms/index.js";
import authenticateWithJWT from "../helpers/functions/authenticateWithJWT.js";
import JoiMiddleware from "../helpers/middlewares/joiMiddleware.js";
import roomSchema from "../helpers/schemas/room.schema.js";
import updateRoomSchema from "../helpers/schemas/updateRoom.schema.js";

const ordersRouter = Router();

ordersRouter.post(
  "/",
  JoiMiddleware(roomSchema),
  authenticateWithJWT,
  roomService.createRoom
);
ordersRouter.get("/", authenticateWithJWT, roomService.getRooms);
ordersRouter.get("/:id", authenticateWithJWT, roomService.getRoomId);
ordersRouter.put(
  "/:id",
  JoiMiddleware(updateRoomSchema),
  authenticateWithJWT,
  roomService.editRoom
);
ordersRouter.patch(
  "/availbleRoom/:id",
  authenticateWithJWT,
  roomService.availbleRoom
);

export default ordersRouter;
