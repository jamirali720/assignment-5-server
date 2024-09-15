import {model, Schema } from 'mongoose';

const imageSchema = new Schema<TImage>(
  {
    image: {
      url: {
        type: String,
        required: [true, "Image URL must be provided"],
      },
      public_id: {
        type: String,
        required: [true, "Public ID must be provided"],
      },
    },
  },
  { timestamps: true }
);


export const ImageModel = model<TImage>("ImageModel", imageSchema);