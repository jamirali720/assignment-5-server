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
      })
      
  }),
});
