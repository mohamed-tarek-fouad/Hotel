import {
  conflictResponse,
  okResponse,
} from "../../helpers/functions/ResponseHandler.js";
import { prisma } from "../../index.js";
import bcrypt from "bcrypt";
import createAccessToken from "../../helpers/functions/createAccessToken.js";
export async function register(req, res, next) {
  try {
    const { email, password, name, phoneNumber } = req.body;
    const checkEmail = await prisma.admins.findUnique({
      where: {
        email,
      },
    });
    if (checkEmail) {
      return conflictResponse(res, "Email already exists");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.admins.create({
      data: {
        email,
        password: encryptedPassword,
        name,
        phoneNumber,
      },
    });
    const newToken = await prisma.tokens.create({
      data: {
        adminId: newUser.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    const accessToken = createAccessToken(newUser.id, newToken.id);
    delete newUser.password;
    return okResponse(res, "User created successfully", {
      ...newUser,
      accessToken,
    });
  } catch (err) {
    next(err);
  }
}
