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
    callbacks: { // callback functions to run after signing in or creating a session
        // add user id from MongoDB to session
        async session({ session }) {
            console.log('Session before adding user id', session);

            try {
                await connectToDatabase(); // Ensure the database is connected
                const sessionUser = await User.findOne({ email: session.user.email }); // find user in database
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString(); // add user id to session

                } else {
                    console.log("User not found in database");
                }
            } catch (error) {
                console.error("Error finding user in database", error);
            }

            console.log('Session after adding user id', session); // log the session data to verify
            return session;
        },
        // create a user in the database when they sign in
        async signIn({ account, profile, user, credentials }) {
            try {
                await connectToDatabase();
                console.log('Profile', profile); // log the profile data for verification
                // check if user exists in database
                const userExists = await User.findOne({ email: profile.email });

                // if not, create user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(), // remove spaces and convert to lowercase
                        image: profile.picture,
                    });
                } else {
                    // update the image if it doesn't exist or has changed
                    if (!userExists.image || userExists.image !== profile.picture) {
                        userExists.image = profile.picture;
                        await userExists.save();
                        console.log("User image updated:", userExists.image);
                    }
                }
                return true;   
            } catch (error) {
                console.log("Error signing in", error);
                return false;
                
            }
            
        },
        
    }
});

export { handler as GET, handler as POST};