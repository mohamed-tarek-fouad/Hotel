import {
  badRequestResponse,
  createdResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function createReservedRoom(req, res, next) {
  try {
    const { id } = req.user;
    const { startAt, endAt, roomId, custommerId } = req.body;
    const validateRoom = await prisma.rooms.findUnique({
      where: {
        id: parseInt(roomId),
      },
    });
    if (!validateRoom) {
      return badRequestResponse(res, "this room doesn't exist");
    }
    if (
      validateRoom.status == "disabled" ||
      validateRoom.status == "reserved"
    ) {
      return badRequestResponse(res, "room isn't availble right now");
    }
    const validateCustommer = await prisma.custommers.findUnique({
      where: {
        id: custommerId,
      },
    });
    if (!validateCustommer) {
      return badRequestResponse(res, "this custommer doesn't exist");
    }

    const ReservedRoom = await prisma.reservedRooms.create({
      data: {
        startAt,
        endAt,
        adminId: id,
        roomId,
        custommerId,
      },
    });
    await prisma.rooms.update({
      where: {
        id: roomId,
      },
      data: {
        status: "reserved",
      },
    });
    return createdResponse(
      res,
      "successfully reserved a new room",
      ReservedRoom
    );
  } catch (err) {
    next(err);
  }
}
