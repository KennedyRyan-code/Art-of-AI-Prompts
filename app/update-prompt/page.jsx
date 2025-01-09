"use client";

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';  // import the Form component

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
    }
    if (promptId) getPromptDetails(); // get the prompt details if the prompt id is available
  }, [promptId]);

    const updatePrompt = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      if (!promptId) return alert('Prompt ID is required!')

      try { // send a PATCH request to update the prompt details in the database api/prompt/[id]
        const response = await fetch(`/api/prompt/${promptId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag
          }),
        });

        if (response.ok) {
          router.push('/profile');
        }
      } catch (error) {
        console.error('An unexpected error happened:', error);        
      } finally {
        setSubmitting(false);
      }
    };
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
      />
    </Suspense>
  )
}

export default EditPrompt;