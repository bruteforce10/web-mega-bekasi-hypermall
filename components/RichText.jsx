"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ onChange }) => {
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    setContent(value);
    onChange(value);
  };

  return <ReactQuill value={content} onChange={handleChange} />;
};

export default RichTextEditor;
