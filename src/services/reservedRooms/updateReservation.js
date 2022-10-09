import {
  badRequestResponse,
  okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function updateReservation(req, res, next) {
  try {
    const { id } = req.params;
    let { startAt, endAt, roomId, custommerId } = req.body;
    const reservedRoom = prisma.reservedRooms.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (
      !reservedRoom.roomId == roomId &&
      !reservedRoom.custommerId == custommerId
    ) {
      return badRequestResponse(res, "roomId or custommerId isn't valid");
    }
    if (!startAt) {
      startAt = reservedRoom.startAt;
    }
    if (!endAt) {
      endAt = reservedRoom.endAt;
    }

    const updatedRoom = await prisma.reservedRooms.update({
      where: {
        id: parseInt(id),
      },
      data: {
        startAt,
        endAt,
      },
    });
    return okResponse(res, "updated reservation successfully", updatedRoom);
  } catch (err) {
    next(err);
  }
}
