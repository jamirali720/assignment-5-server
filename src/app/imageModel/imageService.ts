import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";
import { ImageModel } from "./imageModel";

const uploadHeroImageService = async (payload: TImage) => {
  const newImage = await ImageModel.create(payload);
  if (!newImage) {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Failed to upload image");
  }
  return newImage;
};

const getAllHeroImagesService = async () => {
  const result = await ImageModel.find();
  return result;
};


const deleteHeroImageService = async (imageId: string) => {  
  return  await ImageModel.findByIdAndDelete(imageId);
};

export const ImageServices = {
  uploadHeroImageService,
  getAllHeroImagesService,
  deleteHeroImageService,
};
