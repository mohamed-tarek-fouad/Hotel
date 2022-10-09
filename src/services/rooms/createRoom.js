import {
  badRequestResponse,
  createdResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function createRoom(req, res, next) {
  try {
    const { type, dayCost, description, status } = req.body;
    if (type != "single" && type != "double") {
      return badRequestResponse(res, "custommer must be single or double");
    }
    if (
      status != "available" &&
      status != "reserved" &&
      status != "disabled" &&
      status != undefined
    ) {
      return badRequestResponse(
        res,
        "room must be availble or reserved or disabled"
      );
    }

    const room = await prisma.rooms.create({
      data: {
        type,
        dayCost,
        description,
        status,
      },
    });
    return createdResponse(res, "successfully added a new room", room);
  } catch (err) {
    next(err);
  }
}
