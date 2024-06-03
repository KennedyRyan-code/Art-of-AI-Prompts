import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate('creator'); // populate the creator field with the user data
        console.log('prompts with creator', prompts); // log the prompts with the creator data

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error("Error fetching prompts", error);
        return new Response("Error fetching prompts", { status: 500 });
        
    }
}
