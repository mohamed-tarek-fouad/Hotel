import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getCustommerId(req, res, next) {
  try {
    const { id } = req.params;
    const custommer = await prisma.custommers.findUnique({
      where: {
        id,
      },
      include: {
        reservedRooms: true,
        checkedOutRooms: true,
      },
    });
    return okResponse(res, "fetched the custommer successfully", custommer);
  } catch (err) {
    next(err);
  }
}
