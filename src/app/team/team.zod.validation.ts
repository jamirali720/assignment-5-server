import { z } from "zod";

export const createTeamMemberValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    }),
    role: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be string",
    }),
    
  }),
});

export const updateTeamMemberValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
     
  }),
});
