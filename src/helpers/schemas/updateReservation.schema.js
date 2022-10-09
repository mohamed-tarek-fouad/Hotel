import Joi from "joi";

const reservedRoomSchema = Joi.object({
  startAt: Joi.string().messages({
    "string.empty": "startAt cannot be an empty field",
    "any.required": "startAt is a required field",
  }),
  endAt: Joi.string().messages({
    "string.empty": "endAt cannot be an empty field",
    "any.required": "endAt is a required field",
  }),
});

export default reservedRoomSchema;
