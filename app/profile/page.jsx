'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from '@components/Profile';

const MyProfile = () => {
    const { data: session } = useSession(); // get the session data
    const [posts, setPosts] = useState([]); // state to store the posts

console.log(session?.user.id);  // Log the user id to the console (undefined!!!)     

useEffect(() => {
         // fetch data from the server
    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`); // fetch the posts of a specific user using the user id
        const data = await res.json();

        setPosts(data);
    }
    if (session?.user.id) fetchPosts();
    }, []);

    const handleEdit = () => {
        console.log('Edit button clicked');
    }

    const handleDelete = () => {
        console.log('Delete button clicked');
    }


  return (
    <Profile 
        name="My"
        desc="Wellcome to your personalized profile page."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;