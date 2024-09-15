import { Schema, model } from "mongoose";
import { IUser } from "../auth/auth.interface";
import bcrypt from "bcrypt";
import configs from "../configs";
import { roles } from "./user.constraint";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 3 characters"],      
    },
    phone: {
      type: String,
      required: [true, "User phone number required"],
      trim: true,     
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim:true
    },
    role: {
      type: String,
      default: roles.user,
      enum: [roles.admin, roles.user],
    },
    image: {
      url:{
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

// password hashing before saving user
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(configs.saltRound));
    if(this.email === configs.adminEmail) {
      this.role = "admin";
    }
  next();
});


export const User = model<IUser>("User", userSchema);
