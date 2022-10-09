import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getCheckOutId(req, res, next) {
  try {
    const { id } = req.params;
    const checkOut = await prisma.checkedOutRooms.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        admin: true,
        room: true,
        custommer: true,
      },
    });
    return okResponse(res, "fetched the checkOut successfully", checkOut);
  } catch (err) {
    next(err);
  }
}
