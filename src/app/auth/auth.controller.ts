import httpStatus from "http-status";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { authServices } from "./auth.services";
import { uploadImageToCloudinary } from "../multer/upload";
import { UploadApiResponse } from "cloudinary";
import configs from "../configs";

export const handleSignUpUser = catchAsync(async (req, res) => {
  const resp = (await uploadImageToCloudinary(
    req.file!.path,
    req.file!.filename
  )) as UploadApiResponse;

  const result = await authServices.signupUserService({
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });

  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

export const handleLoginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUserService(req.body);
  const {user, accessToken, refreshToken} = result;
  

  res.cookie("refreshToken", refreshToken, {
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days;
    httpOnly: true,
    secure: configs.NODE_ENV === "production",
    // sameSite: "none",
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "User logged in successfully",
    token: accessToken,
    data: user,
  });
});


export const handleRefreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("check controller", refreshToken  );

  const result = await authServices.getRefreshTokenService(refreshToken);  
  const {user, accessToken} = result!;

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 201,
    message: "New Access token retrieved successfully",
    token: accessToken,
   
  });
});

export const authentication = {
  handleSignUpUser,
  handleLoginUser,
  handleRefreshToken,
};
