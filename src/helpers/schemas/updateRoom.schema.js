import Joi from "joi";

const roomSchema = Joi.object({
  type: Joi.string().messages({
    "string.empty": "type cannot be an empty field",
    "any.required": "type is a required field",
  }),
  dayCost: Joi.number().messages({
    "number.empty": " dayCost cannot be an empty field",
    "any.required": " dayCost is a required field",
  }),
  description: Joi.string().messages({
    "string.empty": "desciption cannot be an empty field",
    "any.required": "description is a required field",
  }),
  status: Joi.string().messages({
    "string.empty": "status cannot be an empty field",
    "any.required": "status is a required field",
  }),
});

export default roomSchema;
