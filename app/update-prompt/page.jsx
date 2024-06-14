"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPromptContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptID}`)
        const data = await response.json();


        setPost({
            prompt: data.prompt,
            tag: data.tag,
        })
    }

    if(promptID) getPromptDetails();

  }, [promptID])



  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);


    if(!promptID) return alert('Prompt ID not found')

    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

const EditPrompt = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <EditPromptContent />
      </Suspense>
    );
  };


export default EditPrompt;
