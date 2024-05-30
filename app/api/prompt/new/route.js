import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// create a new prompt and save it to the database
export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json(); // get prompt, tag, and userId from request body

    try {
        await connectToDatabase();
        // create a new prompt
        // await Prompt.create({
        //     prompt,
        //     tag,
        //     user: userId,
        // });
        const newPrompt = new Prompt({ creator: userId, prompt, tag });
        await newPrompt.save();
        
        // send response return new Response(JSON.stringify(newPrompt), { status: 201 });
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.log("Error creating prompt", error);
        return new Response("Error creating prompt", { status: 500 });
    }
};