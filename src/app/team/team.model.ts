import { Schema, model } from "mongoose";
import { ITeam } from "./team.interface";

const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: [true, "Bike is required"],
      trim: true,
    },
    facebookLink: String,
    twitterLink: String,
    linkedinLink: String,
    githubLink: String,
    youtubeLink: String,
    instagramLink: String,
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: [
        "CEO",
        "CEO & Founder",
        "COO",
        "CFO",
        "CMP",
        "CTO",
        "CIO",
        "CHRO",
        "CPO",
        "Marketing Manager",
        "Sales Director",
        "Brand Manager",
        "Operations Manager",
        "Controller",
      ],
    },
    image: {
      url: {
        type: String,
        required: [true, "Image URL is required"],
      },
      public_id: {
        type: String,
        required: [true, "Public ID is required"],
      },
    },
  },
  { timestamps: true }
);

export const Team = model<ITeam>("Team", teamSchema);
