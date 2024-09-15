import { z } from "zod";

export const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be string",
    }),
    pricePerHour: z.string({
      required_error: "Price per hour is required",
      invalid_type_error: "Price per hour must be number",
    }),
    isAvailable: z.boolean().default(true),
    cc: z.string({
      required_error: "Cc is required",
      invalid_type_error: "Cc must be string",
    }),
    year: z.string({
      required_error: "Year is required",
      invalid_type_error: "Year must be number",
    }),
    model: z.string({
      required_error: "Model is required",
      invalid_type_error: "Model must be string",
    }),
    brand: z.string({
      required_error: "Brand is required",
      invalid_type_error: "Brand must be string",
    }),    
  }),
});

export const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.string().optional(),
    isAvailable: z.string().optional(),
    cc: z.string().optional(),
    year: z.string().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),    
  }),
});
