"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import axios from "@/configs/api";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import LoadingPage from "@/components/Loading";
export default function MotaHomePage() {
  useEffect(() => {
    fetch();
  }, []);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChangeBody = (e) => {
    setContent(e);
  };
  const fetch = async () => {
    setLoading(true);
    try {
      const data = await axios.get("/home");
      setContent(data.data.content.content);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("/home", { content });

      setContent(data.data.updateContent.content);
      toast.success("Chỉnh sửa thành công!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="relative mx-auto max-w-screen-lg space-y-2 py-10"
      onSubmit={handleSubmit}
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <ReactQuill
            theme="snow"
            id="mota"
            className="min-h-80"
            value={content}
            required={true}
            onChange={handleChangeBody}
          />
          <div className="flex justify-end">
            <Button type="submit">Chỉnh sửa</Button>
          </div>
        </>
      )}
    </form>
  );
}
