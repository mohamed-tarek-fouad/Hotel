import Joi from "joi";

const custommerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "email cannot be an empty field",
    "any.required": "email is a required field",
  }),
  name: Joi.string().required().messages({
    "string.empty": " name cannot be an empty field",
    "any.required": " name is a required field",
  }),
  phoneNumber: Joi.string().min(10).required().messages({
    "string.min": "phone number must be 10 characters",
    "string.empty": "phoneNumber cannot be an empty field",
    "any.required": "phoneNumber is a required field",
  }),
  id: Joi.string().min(9).required().messages({
    "string.min": "id must be 9 characters",
    "string.empty": "id cannot be an empty field",
    "any.required": "id is a required field",
  }),
});

export default custommerSchema;
