import { v2 as cloudinary } from "cloudinary";
import { deleteImagePath } from "../utils/deleteImagePath";
import multer, { Multer } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadDir = path.join("/tmp", "uploads");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

//multer function
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload: Multer = multer({
  storage: storage,
});

export const uploadImageToCloudinary = (path: string, name: string) => {
  // Upload an image
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: name,
      },
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
        deleteImagePath(path);
      }
    );
  });
};

export const deleteImageFromCloudinary = (imageId: string) => {
  // delete an image from cloudinary
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(imageId, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
