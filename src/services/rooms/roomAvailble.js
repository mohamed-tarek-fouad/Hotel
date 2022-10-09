import {
  badRequestResponse,
  okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function availbleRoom(req, res, next) {
  try {
    const { id } = req.params;
    const room = prisma.rooms.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!room) {
      return badRequestResponse(res, "room doesn't exist");
    }
    const checkReservation = await prisma.reservedRooms.findFirst({
      where: {
        roomId: parseInt(id),
      },
    });
    if (checkReservation) {
      return badRequestResponse(res, "this room is reserved");
    }
    const updatedRoom = await prisma.rooms.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: "available",
      },
    });
    return okResponse(res, "room is now availble", updatedRoom);
  } catch (err) {
    next(err);
  }
}
