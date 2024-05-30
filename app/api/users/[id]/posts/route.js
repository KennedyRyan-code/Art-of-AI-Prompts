import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, {params}) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator'); // populate the creator field with the user data

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Error fetching prompts", { status: 500 });
        
    }
}
