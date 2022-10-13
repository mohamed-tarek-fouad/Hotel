import {
  badRequestResponse,
  createdResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
export async function createCheckOutRoom(req, res, next) {
  try {
    const { id } = req.user;
    let startAt;
    const { feedBack, custommerId, roomId } = req.body;
    const validateCustommer = await prisma.custommers.findUnique({
      where: {
        id: custommerId,
      },
    });
    if (!validateCustommer) {
      return badRequestResponse(res, "this custommer doesn't exist");
    }
    const validateroom = await prisma.rooms.findUnique({
      where: {
        id: roomId,
      },
    });
    if (!validateroom) {
      return badRequestResponse(res, "this room doesn't exist");
    }

    const custommer = await prisma.custommers.findUnique({
      where: {
        id: custommerId,
      },
      include: {
        reservedRooms: {
          where: {
            roomId,
          },
        },
      },
    });
    const room = await prisma.rooms.findUnique({
      where: {
        id: roomId,
      },
    });
    const validateReservation = await prisma.reservedRooms.findUnique({
      where: {
        roomId,
      },
    });
    if (!validateReservation) {
      return badRequestResponse(res, "reservation doesn't exist");
    }
    if (validateReservation.custommerId != custommerId) {
      return badRequestResponse(res, "invalid custommerId");
    }

    if (custommer.reservedRooms[0]) {
      startAt = custommer.reservedRooms[0].startAt;
    } else {
      startAt = custommer.reservedRooms;
    }
    const daysSpent = Math.floor(
      Math.abs(new Date().getTime() - new Date(startAt).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalCost = room.dayCost * daysSpent;
    const CheckOutRoom = await prisma.CheckedOutRooms.create({
      data: {
        startAt,
        adminId: id,
        roomId,
        custommerId,
        feedBack,
        totalCost,
      },
    });
    await prisma.reservedRooms.delete({
      where: {
        roomId: custommer.reservedRooms[0].roomId,
      },
    });
    await prisma.rooms.update({
      where: {
        id: roomId,
      },
      data: {
        status: "disabled",
      },
    });
    return createdResponse(res, "successfully checkedOutRoom ", CheckOutRoom);
  } catch (err) {
    next(err);
  }
}
