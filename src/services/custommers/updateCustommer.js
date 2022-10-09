import { okResponse } from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";

export async function editCustommer(req, res, next) {
  try {
    const { id } = req.params;
    let { custommerId, name, email, phoneNumber } = req.body;
    const custommer = prisma.custommers.findUnique({
      where: {
        id,
      },
    });
    if (!custommerId) {
      custommerId = custommer.id;
    }
    if (!name) {
      name = custommer.name;
    }
    if (!email) {
      email = custommer.email;
    }
    if (!phoneNumber) {
      phoneNumber = custommer.phoneNumber;
    }
    const updatedCustommer = await prisma.custommers.update({
      where: {
        id,
      },
      data: {
        name,
        id: custommerId,
        email,
        phoneNumber,
      },
    });
    return okResponse(
      res,
      "updated the custommer successfully",
      updatedCustommer
    );
  } catch (err) {
    next(err);
  }
}
