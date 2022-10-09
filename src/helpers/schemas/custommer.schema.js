import Joi from "joi";

const custommerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "startAt cannot be an empty field",
    "any.required": "startAt is a required field",
  }),
  name: Joi.string().required().messages({
    "string.empty": " adminId cannot be an empty field",
    "any.required": " adminId is a required field",
  }),
  phoneNumber: Joi.string().min(10).required().messages({
    "string.min": "phone number must be 10 characters",
    "string.empty": "roomId cannot be an empty field",
    "any.required": "roomId is a required field",
  }),
  id: Joi.string().min(9).required().messages({
    "string.min": "phone number must be 9 characters",
    "string.empty": "id cannot be an empty field",
    "any.required": "id is a required field",
  }),
});

export default custommerSchema;
