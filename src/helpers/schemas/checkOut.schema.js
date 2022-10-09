import Joi from "joi";

const checkOutSchema = Joi.object({
  roomId: Joi.number().required().messages({
    "number.empty": "roomId cannot be an empty field",
    "any.required": "roomId is a required field",
  }),
  custommerId: Joi.string().min(9).required().messages({
    "string.empty": "custommerId cannot be an empty field",
    "any.required": "custommerId is a required field",
  }),
  feedBack: Joi.string().required().messages({
    "string.empty": "feedBack cannot be an empty field",
    "any.required": "feedBack is a required field",
  }),
});

export default checkOutSchema;
