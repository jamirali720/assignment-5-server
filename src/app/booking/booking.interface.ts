import { Types } from "mongoose";

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: string | null;
  totalCost: number;
  isReturned: boolean;
};
