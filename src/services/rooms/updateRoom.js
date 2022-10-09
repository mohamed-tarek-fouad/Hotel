import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function editRoom(req, res, next) {
  try {
    const { id } = req.params;
    let { type, dayCost, description, status } = req.body;
    const room = prisma.rooms.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!type) {
      type = room.type;
    }
    if (!dayCost) {
      dayCost = room.dayCost;
    }
    if (!description) {
      description = room.description;
    }
    if (!status) {
      status = room.status;
    }
    const updatedRoom = await prisma.rooms.update({
      where: {
        id: parseInt(id),
      },
      data: {
        type,
        dayCost,
        description,
        status,
      },
    });
    return okResponse(res, "fetched the room successfully", updatedRoom);
  } catch (err) {
    next(err);
  }
}
