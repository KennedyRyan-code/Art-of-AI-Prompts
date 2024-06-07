import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


// GET (read) a specific prompt
export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();
        const prompt = await Prompt.findById(params.id).populate('creator'); // populate the creator field with the user data
        // console.log('prompts with creator', prompt); // log the prompts with the creator data
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompts", error);
        return new Response("Error fetching prompts", { status: 500 });
        
    }
}


// PATCH (update) a specific prompt
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.error("Error updating prompt", error);
        return new Response("Error updating prompt", { status: 500 });
    }
}

// DELETE a specific prompt
export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        await prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully", { status: 200 });

    } catch (error) {
        console.error("Error deleting prompt", error);
        return new Response("Error deleting prompt", { status: 500 });
    }
}