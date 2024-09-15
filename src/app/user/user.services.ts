import httpStatus from "http-status";
import { ErrorHandler } from "../utils/error";
import { User } from "./user.model";

const getUsersProfileService = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "No Data Found");
  }
  return user;
};

const updateUsersProfileService = async (
  id: string,
  payload: Record<string, string>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = ["name", "phone"];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }

  const result = await User.findByIdAndUpdate(id, updates, { new: true, runValidators:true });
  if (!result) {
    throw new ErrorHandler(httpStatus.NOT_FOUND, "Failed to update ");
  }

  return result;
};

export const userService = {
  getUsersProfileService,
  updateUsersProfileService,
};
