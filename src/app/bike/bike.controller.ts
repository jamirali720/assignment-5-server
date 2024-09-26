import { UploadApiResponse } from "cloudinary";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../multer/upload";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { bikeServices } from "./bike.services";
import { Bike } from "./bike.model";
import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";
import { TBikeQuery } from "./bike.interface";

const handleCreateBike = catchAsync(async (req, res) => {
  const resp = (await uploadImageToCloudinary(
    req.file!.path,
    req.file!.filename
  )) as UploadApiResponse;

  const result = await bikeServices.createBikeService({
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Bike created successfully",
    data: result,
  });
});


const handleGetAllBikes = catchAsync(async (req, res) => {
  const query = req.query as TBikeQuery;      
  const result = await bikeServices.getAllBikesService(query);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result.length === 0 ? "No Data Found" : "Bikes retrieved successfully",
    data: result,
  });
});


const handleGetAllBikesWithoutQuery = catchAsync(async (req, res) => {  
  const result = await bikeServices.getAllBikesWithoutQueryService();

  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result.length === 0 ? "No Data Found" : "Bikes retrieved successfully",
    data: result,
  });
});

const handleGetSingleBike = catchAsync(async (req, res) => {
  const result = await bikeServices.getSingleBikeService(req.params.id);  
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Bike retrieved successfully",
    data: result,
  });
});


const handleUpdateBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const bike = await Bike.findById(id);
  if (!bike) {
    throw new ErrorHandler(
      httpStatus.NOT_FOUND,
      `Bike not found with this ${id}`
    );
  }

  if(req.file?.path){
    
  }
  await deleteImageFromCloudinary(bike.image.public_id);

  const resp = (await uploadImageToCloudinary(
    req.file!.path,
    req.file!.filename
  )) as UploadApiResponse;

  const result = await bikeServices.updateBikeService(id, {
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });
  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result === null ? "Bike updated failed" : "Bike updated successfully",
    data: result,
  });
});

const handleDeleteBike = catchAsync(async (req, res) => { 
  const { id } = req.params;
  const result = await bikeServices.deleteBikeService(id);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: result === null ? "No Data Found" : "Bike deleted successfully",
    data: result,
  });
});

const handleDeleteBikeFromDatabase = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bikeServices.deleteBikeFromDBService(id);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: result === null ? "No Data Found" : "Bike deleted successfully",
    data: result,
  });
});
const handleCreateReview = catchAsync(async (req, res) => {  
  const result = await bikeServices.createReviewService(
    req.params.id,
   { ...req.body,  ...req.user}
  );

  successResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review created successfully",
    data: result,
  });
});

export const bikeController = {
  handleCreateBike,
  handleGetAllBikes,
  handleUpdateBike,
  handleGetSingleBike,
  handleDeleteBike,
  handleCreateReview,
  handleDeleteBikeFromDatabase,
  handleGetAllBikesWithoutQuery,
};
