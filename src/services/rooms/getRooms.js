import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getRooms(req, res, next) {
  try {
    const rooms = await prisma.rooms.findMany({
      include: {
        reservedRooms: true,
        checkedOutRooms: true,
      },
    });
    return okResponse(res, "fetched all rooms successfully", rooms);
  } catch (err) {
    next(err);
  }
}
