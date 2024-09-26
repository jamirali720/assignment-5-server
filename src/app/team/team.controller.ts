import { UploadApiResponse } from "cloudinary";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../multer/upload";
import catchAsync from "../utils/higherOrderFunction";
import { successResponse } from "../utils/success";

import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";
import { TeamServices } from "./teams.services";
import { Team } from "./team.model";

const handleCreateTeam = catchAsync(async (req, res) => { 
  const resp = (await uploadImageToCloudinary(
    req.file!.path,
    req.file!.filename
  )) as UploadApiResponse;

  const result = await TeamServices.createTeamService({
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Team created successfully",
    data: result,
  });
});


const handleGetAllTeams = catchAsync(async (req, res) => {
  const query = req.query.name as string || "";
  const result = await TeamServices.getAllTeamsService(query);

  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result.length === 0 ? "No Data Found" : "Teams retrieved successfully",
    data: result,
  });
});

const handleGetSingleTeam = catchAsync(async (req, res) => {
  const result = await TeamServices.getSingleMemberService(req.params.id);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: "Team retrieved successfully",
    data: result,
  });
});
const handleUpdateTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const team = await Team.findById(id);
  if (!team) {
    throw new ErrorHandler(
      httpStatus.NOT_FOUND,
      `Team not found with this ${id}`
    );
  }
  
  await deleteImageFromCloudinary(team.image.public_id);

  const resp = (await uploadImageToCloudinary(
    req.file!.path,
    req.file!.filename
  )) as UploadApiResponse;

  const result = await TeamServices.updateTeamService(id, {
    ...req.body,
    image: { url: resp.secure_url, public_id: resp.public_id },
  });
  successResponse(res, {
    success: true,
    statusCode: 201,
    message:
      result === null ? "Team updated failed" : "Team updated successfully",
    data: result,
  });
});

const handleDeleteTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamServices.deleteTeamService(id);
  successResponse(res, {
    success: true,
    statusCode: 201,
    message: result === null ? "No Data Found" : "Team deleted successfully",
    data: result,
  });
});



export const TeamController = {
  handleCreateTeam,
  handleGetAllTeams,
  handleUpdateTeam,
  handleGetSingleTeam,
  handleDeleteTeam,  
};
