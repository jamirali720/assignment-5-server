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

const calculateBikeService = async (id: string, payload: string) => {
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
    const advanced = isBooking?.advanced;

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
    const returnTime = new Date(payload);

    if (startTime.getTime() > returnTime.getTime()) {
      throw new ErrorHandler(
        httpStatus.BAD_REQUEST,
        "Return time should be after start time"
      );
    }

    const rentalHour = getRentalHour(startTime, returnTime) / (1000 * 60 * 60);

    const totalCost = rentalHour * bike.pricePerHour;
    const remainingCost = totalCost - advanced;


    const result = await Booking.findByIdAndUpdate(
      id,
      {
        returnTime: returnTime.toISOString(),
        totalCost: totalCost.toFixed(),
        remainingCost: remainingCost.toFixed(),
        isReturnedMoney: remainingCost < advanced ? true : false,
        isReturned: totalCost < advanced ? true : false,
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

    throw new ErrorHandler(httpStatus.NOT_FOUND, (error as Error).message);
  }
};

const returnBikeService = async (id: string) => {
  try {
    const isBooking = await Booking.findById(id);
    if (!isBooking) {
      throw new ErrorHandler(
        httpStatus.NOT_FOUND,
        "Rental Booking not found with this ID"
      );
    }

    const bikeId = isBooking?.bikeId;

    const bike = await Bike.findById(bikeId);

    if (!bike) {
      throw new ErrorHandler(httpStatus.NOT_FOUND, "Bike not found");
    }

    const result = await Booking.findByIdAndUpdate(
      id,
      {
        isReturned: true,
      },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update booking");
    }

    return result;
  } catch (error) {
    console.log(error);

    throw new ErrorHandler(httpStatus.NOT_FOUND, (error as Error).message);
  }
};
const updateBookingAfterRefundMoneyService = async (id: string) => {
  try {
    const isBooking = await Booking.findById(id);
    if (!isBooking) {
      throw new ErrorHandler(
        httpStatus.NOT_FOUND,
        "Rental Booking not found with this ID"
      );
    }

   
    const result = await Booking.findByIdAndUpdate(
      id,
      {
        remainingCost:0,
        isReturnedMoney: false,        
      },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update booking");
    }

    return result;
  } catch (error) {
    console.log(error);

    throw new ErrorHandler(httpStatus.NOT_FOUND, (error as Error).message);
  }
};

const getRentalByIdService = async (id: string) => {
  const result = await Booking.findById(id).populate("bikeId");
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const getRentalByUserIdService = async (userId: string) => {
  const result = await Booking.find({ userId }).populate("bikeId");
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const getAllRentalsService = async () => {
  const result = await Booking.find().populate("bikeId");
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};
const deleteRentalService = async (id: string) => {
  return await Booking.findByIdAndDelete(id);
};

export const bookingServices = {
  createRentalService,
  returnBikeService,
  getRentalByIdService,
  getRentalByUserIdService,
  getAllRentalsService,
  calculateBikeService,
  updateBookingAfterRefundMoneyService,
  deleteRentalService,
};
