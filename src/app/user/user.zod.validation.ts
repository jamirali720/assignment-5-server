import { z } from "zod";

export const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    phone: z
      .string({
        required_error: "Phone is required",
        invalid_type_error: "Phone must be string",
      }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string",
      }),
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be string",
      })
      
  }),
});
