import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      ref: "Bike",
      required: [true, "Bike Id is required"],
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    returnTime: {
      type: String,
      default: null,
    },
    advanced: {
      type: Number,
      required: [true, "Advanced amount is required"],
      trim: true,
    },
    totalCost: {
      type: Number,
      required: [true, "Total cost is required"],
      default: 0,
    },
    remainingCost: {
      type: Number,
      required: [true, "Remaining cost is required"],
      default: 0,
    },
    isReturned: {
      type: Boolean,
      default: false,
    },
    isReturnedMoney: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
      required: [true, "Payment ID is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
