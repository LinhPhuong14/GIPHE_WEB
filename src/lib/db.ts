import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/";

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: MongooseCache = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log(" Connecting to MongoDB...");
    
    const options: ConnectOptions = {
      dbName: "GIPHE", 
      bufferCommands: false, // Tăng hiệu suất
    };

    cached.promise = mongoose.connect(MONGODB_URI, options)
      .then((mongoose) => {
        console.log(" Connected to MongoDB");
        return mongoose;
      })
      .catch((error) => {
        console.error(" MongoDB connection error:", error);
        process.exit(1);
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Lưu cache để tránh connect nhiều lần (chỉ cần cho môi trường phát triển)
if (process.env.NODE_ENV !== "production") {
  (global as any).mongoose = cached;
}
