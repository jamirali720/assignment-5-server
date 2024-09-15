
import { Bike } from "./bike.model";
import { TBike, TReview } from "./bike.interface";
import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";

const createBikeService = async (payload: TBike) => {
  const newBike = await Bike.create(payload);
  if (!newBike) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Failed to create  new bike"
    );
  }
  return newBike;
};
const uploadHeroImageService = async (payload: TBike) => {
  const newBike = await Bike.create(payload);
  if (!newBike) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Failed to create  new bike"
    );
  }
  return newBike;
};
const getSingleBikeService = async (id: string) => {
  const bike = await Bike.findById(id);
  if (!bike) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Bike not found"
    );
  }
  return bike;
};

const getAllBikesService = async (query: string) => {
  
  const searchRegExp = new RegExp(".*" + query + ".*", "i");


  const filter = query !== "" ? {name: { $regex: searchRegExp }} : {};
 
  const result = await Bike.find(filter);

  return result;
};

const updateBikeService = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = [
    "name",
    "description",
    "cc",
    "year",
    "isAvailable",
    "pricePerHour",
    "model",
    "brand",
    "image",
  ];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }
  const result = await Bike.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      " Bike not found and update failed"
    );
  }
  return result;
};
const deleteBikeService = async (id: string) => {
  const result = await Bike.findByIdAndUpdate(
    id,
    { isAvailable: false },
    { new: true, runValidators: true }
  );
  return result;
};

const createReviewService = async (id: string, payload: TReview) => {
  const { username, email, message, userId, rating } = payload;

  const newReview = {userId, username, email, message, rating: Number(rating) };

  const bike = await Bike.findById(id);
  if (!bike) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Bike not found");
  }

  const isReviewed = bike.reviews?.find((review) => review.email === email);
  if (isReviewed) {
    bike.reviews?.forEach((review) => {
      if (review.email === email) {        
        review.userId = userId;
        review.username = username;
        review.email = email;
        review.message = message;
        review.rating = Number(rating);
      }
    });
  } else {
    bike.reviews?.push(newReview);
    bike.numberOfReviews = bike.reviews?.length;
  }

  let averageRating = 0;

  bike.reviews?.forEach((review) => {
    averageRating += review.rating;
  });

  bike.ratings = averageRating / bike.reviews?.length!;
  await bike.save({ validateBeforeSave: false });

  return bike;
};

export const bikeServices = {
  createBikeService,
  getAllBikesService,
  updateBikeService,
  deleteBikeService,
  getSingleBikeService,
  uploadHeroImageService,
  createReviewService,
};
