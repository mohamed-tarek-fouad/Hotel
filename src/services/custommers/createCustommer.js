import {
  badRequestResponse,
  createdResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function createCustommer(req, res, next) {
  try {
    const { id, name, email, phoneNumber } = req.body;
    const validateId = await prisma.custommers.findUnique({
      where: {
        id,
      },
    });
    if (validateId) {
      return badRequestResponse(res, "this custommer has been created before");
    }
    const custommer = await prisma.custommers.create({
      data: {
        id,
        name,
        email,
        phoneNumber,
      },
    });
    return createdResponse(
      res,
      "successfully added a new custommer",
      custommer
    );
  } catch (err) {
    next(err);
  }
}
