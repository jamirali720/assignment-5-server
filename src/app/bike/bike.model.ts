import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>(
  {
    name: {
      type: String,
      required: [true, "Bike is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    pricePerHour: {
      type: Number,
      required: [true, "Price per hour is required"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    cc: {
      type: String,
      required: [true, "CC is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    image: {
      url: {
        type: String,
        required: [true, "Image url is required"],
      },
      public_id: {
        type: String,
        required: [true, "Public ID is required"],
      },
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {        
        userId: {
          type: Schema.Types.ObjectId,    
          ref: "User",    
          required: [true, "User ID is required"],
        },
        username: {
          type: String,         
          required: [true, "User name is required"],
        },
        email: {
          type: String,
          required: [true, "Email is required"],
        },
        message: {
          type: String,
          required: [true, "Message is required"],
        },
        rating: {
          type: Number,
          required: [true, "Rating is required"],
        },
      },
    ],
  },
  { timestamps: true }
);

export const Bike = model<TBike>("Bike", bikeSchema);
