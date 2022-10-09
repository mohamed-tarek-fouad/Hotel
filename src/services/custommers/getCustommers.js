import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getCustommers(req, res, next) {
  try {
    const custommers = await prisma.custommers.findMany({
      include: {
        reservedRooms: true,
        checkedOutRooms: true,
      },
    });
    return okResponse(res, "fetched all custommers successfully", custommers);
  } catch (err) {
    next(err);
  }
}
