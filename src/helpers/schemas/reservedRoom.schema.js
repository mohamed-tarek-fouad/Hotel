import Joi from "joi";

const reservedRoomSchema = Joi.object({
  startAt: Joi.string().default(new Date()).messages({
    "string.empty": "startAt cannot be an empty field",
    "any.required": "startAt is a required field",
  }),
  roomId: Joi.number().required().messages({
    "number.empty": "roomId cannot be an empty field",
    "any.required": "roomId is a required field",
  }),
  custommerId: Joi.string().min(9).required().messages({
    "string.empty": "custommerId cannot be an empty field",
    "any.required": "custommerId is a required field",
  }),
  endAt: Joi.string().required().messages({
    "string.empty": "endAt cannot be an empty field",
    "any.required": "endAt is a required field",
  }),
});

export default reservedRoomSchema;
