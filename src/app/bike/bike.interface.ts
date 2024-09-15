import { Schema } from "mongoose";

export type TBike = {
  name: string;
  description: string;
  pricePerHour: number;
  isAvailable: boolean;
  cc: string;
  year: number;
  model: string;
  brand: string;
  ratings: number;
  numberOfReviews: number;
  image: {
    url: string;
    public_id: string;
  };
  reviews: [
    {
      userId: string;
      username: string;
      email: string;
      message: string;
      rating: number;
    }
  ];
};

export type TReview = {
  userId: string;
  username: string;
  email: string;
  message: string;
  rating: number;
};
