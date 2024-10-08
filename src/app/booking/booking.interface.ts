import { Types } from "mongoose";

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: string | null;
  advanced: number;
  totalCost: number;
  remainingCost: number;
  isReturnedMoney: boolean;
  paymentId: string;
  isReturned: boolean;
};
