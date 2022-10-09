import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getReservedRooms(req, res, next) {
  try {
    const ReservedRooms = await prisma.reservedRooms.findMany({
      include: {
        admin: true,
        custommer: true,
        room: true,
      },
    });
    return okResponse(
      res,
      "fetched all ReservedRooms successfully",
      ReservedRooms
    );
  } catch (err) {
    next(err);
  }
}
