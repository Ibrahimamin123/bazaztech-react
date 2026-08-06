import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Failed");
    if (error.name === "MongooseServerSelectionError") {
      console.error(
        "Could not reach MongoDB. If you use Atlas, whitelist your current IP in Network Access."
      );
    }
    console.error(error.message || error);
    process.exit(1);
  }
};

export default connectDB;