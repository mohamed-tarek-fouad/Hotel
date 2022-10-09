import Joi from "joi";

const roomSchema = Joi.object({
  type: Joi.string().required().messages({
    "string.empty": "type cannot be an empty field",
    "any.required": "type is a required field",
  }),
  dayCost: Joi.number().required().messages({
    "number.empty": " dayCost cannot be an empty field",
    "any.required": " dayCost is a required field",
  }),
  description: Joi.string().required().messages({
    "string.empty": "desciption cannot be an empty field",
    "any.required": "description is a required field",
  }),
});

export default roomSchema;
