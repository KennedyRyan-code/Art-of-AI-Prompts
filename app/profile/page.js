'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from '@components/Profile';

const MyProfile = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]); // state to store the posts

       

useEffect(() => {
         // fetch data from the server
    const fetchPosts = async () => {
        const res = await fetch(`/api/users/${session?.user.id}/posts`);
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
        desc="This is my profile page."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;