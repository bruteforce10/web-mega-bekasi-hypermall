"use client";
import BundledEditor from "@/components/BundledEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ImageViewList from "./_component/ImageViewList";

const RichPage = () => {
  const [image, setImage] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [coverId, setCoverId] = useState("");

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmitImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await fetch(
        "http://localhost:3001/api/v1/cms/images",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Image upload failed: ${uploadResponse.statusText}`);
      }

      const uploadedImageData = await uploadResponse.json();

      if (uploadedImageData) {
        const coverResponse = await fetch(
          "http://localhost:3001/api/v1/cms/cover-directorys",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: descriptionText,
              images: uploadedImageData?.data?._id,
            }),
          }
        );

        if (!coverResponse.ok) {
          throw new Error(
            `Cover directory submission failed: ${coverResponse.statusText}`
          );
        }

        const coverData = await coverResponse.json();

        if (coverData) {
          setImage("");
          const inputUpload = document.getElementById("pictureUpload");
          setCoverId(coverData?.data._id);

          inputUpload.value = "";
        }
      }
    } catch (error) {
      console.error("Error during image submission:", error);
    }
  };

  return (
    <div className="container mx-auto space-y-4 mt-12">
      <div className="flex justify-between gap-12">
        <div>
          <div className="space-y-4 ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pictureUpload">Picture</Label>
              <Input id="pictureUpload" type="file" onChange={onChangeImage} />
            </div>
          </div>

          {image && (
            <div className="space-y-4 mt-4">
              <h3>Preview Gambar:</h3>
              <Input
                type="text"
                placeholder="deskripsi gambar"
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                disabled={coverId}
              />
              <Image
                src={URL.createObjectURL(image)}
                alt="Selected"
                width={300}
                height={300}
              />
              <Button
                variant="secondary"
                onClick={handleSubmitImage}
                className="py-0"
              >
                Submit Gambar
              </Button>
            </div>
          )}
        </div>

        {coverId && <ImageViewList coverId={coverId} image={image} />}
      </div>
      {/* <BundledEditor
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
      /> */}
      {/* <button onClick={log}>Log editor content</button> */}
    </div>
  );
};

export default RichPage;
