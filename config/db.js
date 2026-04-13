import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log("Using cached DB connection");
        return cached.conn;
    }
    if (!cached.promise) {
        console.log("Connecting to DB...");
        cached.promise = mongoose.connect(`${process.env.MONGODB_URL}/FashTech`, opts).then(mongoose => {
            console.log("DB connected successfully ✅");
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
export default connectDB;