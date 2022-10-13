import {
  badRequestResponse,
  okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function getRooms(req, res, next) {
  try {
    const { status, type } = req.query;
    if (!status && !type) {
      const rooms = await prisma.rooms.findMany({
        include: {
          reservedRooms: true,
          checkedOutRooms: true,
        },
      });
      if (rooms.length == 0) {
        return badRequestResponse(res, "there is no  rooms");
      }
      return okResponse(res, "fetched all rooms successfully", rooms);
    } else if (status || type) {
      const rooms = await prisma.rooms.findMany({
        where: {
          status,
          type,
        },
        include: {
          reservedRooms: true,
          checkedOutRooms: true,
        },
      });
      if (rooms.length == 0) {
        return badRequestResponse(
          res,
          "there is no  rooms with this type or status"
        );
      }
      return okResponse(res, `fetched all specified rooms successfully`, rooms);
    }
  } catch (err) {
    next(err);
  }
}
