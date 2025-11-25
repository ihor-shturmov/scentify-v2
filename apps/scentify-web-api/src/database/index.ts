import mongoose from "mongoose";

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Export function to connect to MongoDB
// Environment variables should be loaded before calling this function
export async function connectDB() {
    const mongoDB = process.env.MONGODB_URI;

    if (!mongoDB) {
        throw new Error("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(mongoDB);
    console.log("✅ Connected to MongoDB");
}

export default mongoose;