import { Team } from "./team.model";
import { ITeam } from "./team.interface";
import { ErrorHandler } from "../utils/error";
import httpStatus from "http-status";

const createTeamService = async (payload: ITeam) => {
  const teamMember = await Team.create(payload);
  if (!teamMember) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      "Failed to create  new team member"
    );
  }
  return teamMember;
};

const getSingleMemberService = async (id: string) => {
  const teamMember = await Team.findById(id);
  if (!teamMember) {
    throw new ErrorHandler(httpStatus.BAD_REQUEST, "Team member not found");
  }
  return teamMember;
};

const getAllTeamsService = async (query: string) => {
  const searchRegExp = new RegExp(".*" + query + ".*", "i");

  const filter = query !== "" ? { name: { $regex: searchRegExp } } : {};

  const result = await Team.find(filter);

  return result;
};

const updateTeamService = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const updates: Record<string, unknown> = {};
  const allowedUpdatesFields = ["name", "role", "image", "education", "skills", "experience", "achievements", ];

  if (payload && typeof payload === "object") {
    for (const key in payload) {
      if (allowedUpdatesFields.includes(key)) {
        updates[key] = payload[key];
      }
    }
  }

  const result = await Team.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ErrorHandler(
      httpStatus.BAD_REQUEST,
      " Team not found and update failed"
    );
  }
  return result;
};

const deleteTeamService = async (id: string) => { 
  return await Team.findByIdAndDelete(id);
};

export const TeamServices = {
  createTeamService,
  getAllTeamsService,
  getSingleMemberService,
  updateTeamService,
  deleteTeamService,
};
