import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callback: {
        // create a user in the database when they sign in
        async signIn({ profile }) {
            try {
                await connectToDatabase();
                // check if user exists in database
                const userExists = await User.findOne({ email: profile.email });

                // if not, create user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(), // remove spaces and convert to lowercase
                        image: profile.image,
                    });
                }
                return true;   
            } catch (error) {
                console.log("Error signing in", error);
                return false;
                
            }
            
        },
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email }); // find user in database
            session.user.id = sessionUser._id.toString(); // add user id to session

            return session;
        },
    },
});

export { handler as GET, handler as POST};