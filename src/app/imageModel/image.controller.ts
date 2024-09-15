import { UploadApiResponse } from "cloudinary";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../multer/upload";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";

import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";
import { ImageServices } from "./imageService";
import { ImageModel } from "./imageModel";

const handleUploadHeroImageTocloudinary = catchAsync(async (req, res) => {
  const resp = (await uploadImageToCloudinary(
    req.file!.path,
    req.file!.filename
  )) as UploadApiResponse;

  const result = await ImageServices.uploadHeroImageService({
    image: { url: resp.secure_url, public_id: resp.public_id },
  });
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Hero Image Uploaded successfully",
    data: result,
  });
});
const handleGetAllHeroImages = catchAsync(async (req, res) => {
  const result = await ImageServices.getAllHeroImagesService();

  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result.length === 0
        ? "No Data Found"
        : "Hero images retrieved successfully",
    data: result,
  });
});

const handleDeleteHeroImage = catchAsync(async (req, res) => {
 
  const { id } = req.params;
   const image = await ImageModel.findById(id);
   if (!image) {
     throw new ErrorHandler(
       httpStatus.NOT_FOUND,
       `hero image not found with this ${id}`
     );
   }
   await deleteImageFromCloudinary(image.image.public_id);
  const result = await ImageServices.deleteHeroImageService(id);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: result === null ? "No Data Found" : "Hero Image deleted successfully",
    data: result,
  });
});

export const ImageController = {
  handleUploadHeroImageTocloudinary,
  handleGetAllHeroImages,
  handleDeleteHeroImage,
};
