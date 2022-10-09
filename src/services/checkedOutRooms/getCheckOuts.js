import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getChekOuts(req, res, next) {
  try {
    const checkOuts = await prisma.checkedOutRooms.findMany({
      include: {
        admin: true,
        room: true,
        custommer: true,
      },
    });
    return okResponse(res, "fetched all checkouts successfully", checkOuts);
  } catch (err) {
    next(err);
  }
}
