import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getReservedroomId(req, res, next) {
  try {
    const { id } = req.params;
    const reservedRoom = await prisma.reservedRooms.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        custommer: true,
        admin: true,
        room: true,
      },
    });
    return okResponse(
      res,
      "fetched the reservedRoom successfully",
      reservedRoom
    );
  } catch (err) {
    next(err);
  }
}
