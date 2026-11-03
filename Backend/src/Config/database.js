import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  const connectionInstance = await mongoose.connect(config.MONGODB_URI);

  console.log(
    `MongoDB connected: DB HOST: ${connectionInstance.connection.host}`,
  );
};

export default connectDB;
