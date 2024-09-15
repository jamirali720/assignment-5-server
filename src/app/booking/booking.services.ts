import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { Bike } from "../bike/bike.model";
import { getRentalHour } from "../utils/getTimeDifference";

const createRentalService = async (user: JwtPayload, payload: TBooking) => {
  const session = await mongoose.startSession();

  payload.userId = user.userId;
  try {
    session.startTransaction();
    const isBikeExists = await Bike.findById(payload.bikeId);
    if (!isBikeExists) {
      throw new ErrorHandler(
        httpStatus.NOT_FOUND,
        "Bike not found with this ID"
      );
    }

    const result = await Booking.create([payload], { session });
    if (!result) {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        "Failed to create booking"
      );
    }

    await Bike.findByIdAndUpdate(payload.bikeId, { isAvailable: false });

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new ErrorHandler(httpStatus.BAD_REQUEST, (error as Error).message);
  }
};

const returnBikeService = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isBooking = await Booking.findById(id);
    if (!isBooking) {
      throw new ErrorHandler(
        httpStatus.NOT_FOUND,
        "Rental Booking not found with this ID"
      );
    }

    const bikeId = isBooking?.bikeId;
    const bike = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: true },
      { new: true, runValidators: true, session }
    );
    if (!bike) {
      throw new ErrorHandler(
        httpStatus.NOT_FOUND,
        "Bike not found and failed to update"
      );
    }

    const startTime = new Date(`${isBooking.startTime}`);
    
    const returnTime = new Date();
    const rentalHour = getRentalHour(startTime, returnTime) / (1000 * 60 * 60);
    const rentPrice: number = rentalHour * bike.pricePerHour;

    const result = await Booking.findByIdAndUpdate(
      id,
      {
        isReturned: true,
        returnTime: returnTime.toISOString(),
        totalCost: rentPrice.toFixed(),
      },
      { new: true, runValidators: true, session }
    );

    if (!result) {
      throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update booking");
    }

    await session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
 
    throw new ErrorHandler(httpStatus.NOT_FOUND, ( error as Error).message);
  }
};
const getAllRentalService = async (userId: string) => {
  const result = await Booking.find({ userId });
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

export const bookingServices = {
  createRentalService,
  returnBikeService,
  getAllRentalService,
};
