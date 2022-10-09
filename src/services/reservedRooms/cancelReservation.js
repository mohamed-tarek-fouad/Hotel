import {
  badRequestResponse,
  okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function cancelReservation(req, res, next) {
  try {
    const { id } = req.params;
    const reservedRoom = await prisma.reservedRooms.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        room: true,
      },
    });
    if (!reservedRoom) {
      return badRequestResponse(res, "room doesn't exist");
    }
    await prisma.reservedRooms.delete({
      where: {
        id: parseInt(id),
      },
    });
    await prisma.rooms.update({
      where: {
        id: reservedRoom.roomId,
      },
      data: {
        status: "available",
      },
    });
    return okResponse(res, "canceled reservation successfully", reservedRoom);
  } catch (err) {
    next(err);
  }
}
