import mongoose from "mongoose";

const DBconnection = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log("error", error);
  }
};

export { DBconnection };
