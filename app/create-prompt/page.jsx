"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Form from '@components/Form';

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });

    const createPrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        const response = await fetch('/api/prompt/new', {
          method: 'POST',
          body: JSON.stringify({
            // post data
          })
        });
      } catch (error) {
        
      }
    };
 
  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt