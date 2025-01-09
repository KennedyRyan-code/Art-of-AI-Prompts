import { Schema, model, models } from "mongoose";

// Define the schema
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", userSchema); // If the model exists, use it. If not, create it

export default User;