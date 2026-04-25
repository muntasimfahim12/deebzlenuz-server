import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error("❌ DATABASE_URL is missing in environment variables");
}

// Safe global type
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Attach to global safely
const globalAny = global as any;

let cached: MongooseCache = globalAny.mongoose;

if (!cached) {
  cached = globalAny.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  // reuse connection
  if (cached.conn) return cached.conn;

  // create connection only once
  if (!cached.promise) {
    console.log("🔄 Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected Successfully");
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error("❌ MongoDB Connection Failed:", error);
    throw error;
  }
}