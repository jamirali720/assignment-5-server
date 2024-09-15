import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";
import { userService } from "./user.services";

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


export const userController = {
    handleGetUserProfile, 
    handleUpdateUserProfile
}