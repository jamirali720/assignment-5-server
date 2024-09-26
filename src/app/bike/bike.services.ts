import { Bike } from "./bike.model";
import { TBike, TBikeQuery, TReview } from "./bike.interface";
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
  const bike = await Bike.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "userId",
      },
    })
    .select("-password");
  if (!bike) {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Bike not found");
  }
  return bike;
};

const getAllBikesService = async (query: TBikeQuery) => {
  const searchRegExp = new RegExp(".*" + query.name + ".*", "i");

  const filter1 = query.name !== "" ? { name: { $regex: searchRegExp } } : {};
  const filter2 =
    query.brand !== "All"
      ? { brand: { $regex: query.brand, $options: "i" } }
      : {};
  const filter3 =
    query.model !== "All"
      ? { model: { $regex: query.model, $options: "i" } }
      : {};
  const filter4 =
    query.cc !== "All" ? { cc: { $regex: query.cc, $options: "i" } } : {};
  const filter5 =
    query.year !== "All" ? { year: { $eq: Number(query.year) } } : {};

  const result = await Bike.find({
    $and: [filter1, filter2, filter3, filter4, filter5],
  });

  return result;
};
const getAllBikesWithoutQueryService = async () => {
  return await Bike.find();
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

const deleteBikeFromDBService = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

const createReviewService = async (id: string, payload: TReview) => {
  const { username, email, message, userId, rating } = payload;

  const newReview = {
    userId,
    username,
    email,
    message,
    rating: Number(rating),
  };

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
  deleteBikeFromDBService,
  uploadHeroImageService,
  createReviewService,
  getAllBikesWithoutQueryService,
};
