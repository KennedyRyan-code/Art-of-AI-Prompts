import mongoose from "mongoose";

// This variable will be used to check if the database is already connected
let isConnected = false;

// This function will connect to the database
export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("Using existing connection");
        return;
    }

    try {
        // Connect to the database
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "shared_prompts",
        })
        isConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.log("Error connecting to database", error);
    }
};