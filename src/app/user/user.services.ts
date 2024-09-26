import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";
import { User } from "./user.model";
import configs from "../configs";

const getUsersProfileService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Data Found");
  }
  return user;
};
const getAllUsersService = async () => {
  const users = await User.find();
  if (!users) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No users Found");
  }
  return users;
};

// update user profile
const updateUsersProfileService = async (
  id: string,
  payload: Record<string, string>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = ["name", "phone", "email", "address"];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }

  const result = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update ");
  }

  return result;
};

// Update users profile image
const updateUserProfileImage = async (
  id: string,
  payload: { image: { url: string; public_id: string } }
) => {
  const result = await User.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true, runValidators: true }
  );
  if (!result) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Failed to update user profile image"
    );
  }
  return result;
};

// change user password
const changePasswordService = async (
  id: string,
  payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
) => {
  console.log(payload);
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "User dose not exist");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Current password not matched");
  }
  if (payload.newPassword !== payload.confirmPassword) {
    throw new ErrorHandler(httpStatus.CONFLICT, "Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(configs.saltRound)
  );
  const result = await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true, runValidators: true }
  );
  if (!result) {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Failed to change password");
  }

  return result;
};

// update user status
const updateUserRoleService = async (id: string, payload: { role: string }) => {  
  const user = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new ErrorHandler(
      httpStatus.NOT_FOUND,
      "Failed to update user status"
    );
  }
  return user;
};

// delete user
const deleteUserFromDBService = async (id: string) => {
  console.log(id)
  return await User.findByIdAndDelete(id);
};

export const userService = {
  getUsersProfileService,
  getAllUsersService,
  updateUsersProfileService,
  updateUserProfileImage,
  changePasswordService,
  updateUserRoleService,
  deleteUserFromDBService,
};
