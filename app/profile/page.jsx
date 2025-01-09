'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter(); // get the router object
    const { data: session } = useSession(); // get the session data
    const [posts, setPosts] = useState([]); // state to store the posts
     

useEffect(() => {
         // fetch data from the server
    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`); // fetch the posts of a specific user using the user id
        const data = await res.json();

        setPosts(data);
    }
    if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`) // navigate to the update prompt page
        console.log('Edit button clicked');
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?'); // show a confirmation dialog
        
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });
                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log('An unexpected error occurred:', error);
                
            }
        }
    }


  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;