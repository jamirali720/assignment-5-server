import fs from "fs";

export const deleteImagePath = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Image deleted successfully");
  });
};
