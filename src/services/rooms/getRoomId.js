import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getRoomId(req, res, next) {
  try {
    const { id } = req.params;
    const room = await prisma.rooms.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        reservedRooms: true,
        checkedOutRooms: true,
      },
    });
    return okResponse(res, "fetched the room successfully", room);
  } catch (err) {
    next(err);
  }
}
