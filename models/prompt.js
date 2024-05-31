import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Please provide a prompt"],
    },
    tag: {
        type: String,
        required: [true, "Please provide a tag"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;