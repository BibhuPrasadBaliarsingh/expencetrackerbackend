import mongoose from "mongoose";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI (or MONGODB_URI) is not set in environment variables");
  }

  mongoose.set("strictQuery", true);

  const conn = await mongoose.connect(mongoUri);
  // eslint-disable-next-line no-console
  console.log(`MongoDB connected: ${conn.connection.host}`);
};
