import React from "react";
import BundledEditor from "./BundledEditor";

const RichEditor = ({ reff }) => {
  return (
    <BundledEditor
      onInit={(_evt, editor) => (reff.current = editor)}
      init={{
        height: 600,
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
  );
};

export default RichEditor;
