import mongoose from "mongoose";

import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/proshop_app`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDb connection error", error);
  }
};

export default connectDB;
