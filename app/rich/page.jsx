"use client";
import BundledEditor from "@/components/BundledEditor";
import React, { useRef, useState } from "react";

const RichPage = () => {
  const [value, setValue] = useState("");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("http://localhost:3001/api/v1/cms/images", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        const imageUrl = data.url;
        console.log(imageUrl);

        const quill = document.querySelector(".ql-editor");
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", imageUrl);
      }
    };
  };

  return (
    <div className="container mx-auto">
      <BundledEditor
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "help",
            "image",
            "link",
            "lists",
            "searchreplace",
            "table",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image | link | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Log editor content</button>
    </div>
  );
};

export default RichPage;
