import { UploadApiResponse } from "cloudinary";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../multer/upload";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { userService } from "./user.services";
import { User } from "./user.model";
import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";

const handleGetUserProfile = catchAsync(async(req, res) => {   
    const id = req.user.userId; 
    const result = await userService.getUsersProfileService(id);   
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "Your profile retrieved successfully",
        data: result
    })
})
const handleGetAllUsers = catchAsync(async(req, res) => {     
    const result = await userService.getAllUsersService();   
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "users  retrieved successfully",
        data: result
    })
})
const handleUpdateUserProfile = catchAsync(async(req, res) => {    
    const id = req.user.userId;
    const updateData = req.body;

    const result = await userService.updateUsersProfileService(id, updateData);
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "Your profile updated successfully",
        data: result
    })
})

// update user status  
const handleUpdateUserRole = catchAsync(async(req, res) => {    
    const id = req.params.userId; 
    const role = req.body;
    const result = await userService.updateUserRoleService(id, role);
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "User role updated successfully",
        data: result
    })
})
// delete user from database;
const handleDeleteUserFromDB = catchAsync(async(req, res) => {    
    const id = req.params.userId;   

    const result = await userService.deleteUserFromDBService(id);
    successResponse(res, {
        success:true, 
        statusCode: 200, 
        message: "User deleted successfully",
        data: result
    })
})

// update user profile image 
const handleUpdateUserProfileImage = catchAsync(async (req, res) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User not found with this ID");
  }

 await deleteImageFromCloudinary(user.image.public_id);
  
  
   const resp = (await uploadImageToCloudinary(
     req.file!.path,
     req.file!.filename
   )) as UploadApiResponse;

  const result = await userService.updateUserProfileImage(id, {   
    image: { url: resp.secure_url, public_id: resp.public_id },
  });

  

  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your profile image updated successfully",
    data: result,
  });
});

const handleChangUserPassword = catchAsync(async (req, res) => {
  const id = req.user.userId;
  const result = await userService.changePasswordService(id, { ...req.body });


  successResponse(res, {
    success: true,
    statusCode: 200,
    message: "Your password changed successfully",
    data: result,
  });
});


export const userController = {
  handleGetUserProfile,
  handleGetAllUsers,
  handleUpdateUserProfile,
  handleUpdateUserProfileImage,
  handleChangUserPassword,
  handleUpdateUserRole,
  handleDeleteUserFromDB,
};