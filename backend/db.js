import mongoose from "mongoose";

export const connect = async (url) => {
 await mongoose
    .connect(url)
    .then(() => {
      console.log("Connected");
    })
    .catch((error) => {
      console.error(error);
    });
};
