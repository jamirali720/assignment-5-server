import { z } from "zod";

export const bookingSchemaValidation = z.object({
  body: z.object({
    bikeId: z.string({ required_error: "Bike id is required" }),
    paymentId: z.string({ required_error: "Payment ID id is required" }),
    startTime: z
      .string({ required_error: "Start time  is required" })
      .datetime(),
    advanced: z.number({ required_error: "Advanced amount is required" }),
  }),
});
