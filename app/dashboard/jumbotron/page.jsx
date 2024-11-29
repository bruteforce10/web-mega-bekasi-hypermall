"use client";
import React, { useEffect, useState } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./_component/Column";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const JumbotronPage = () => {
  const [imagesJumbotron, setImagesJumbotron] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/cms/jumbotron"
        );
        const data = await response.json();
        setImagesJumbotron(data?.data?.images || []);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const originalPos = imagesJumbotron.findIndex(
      (item) => item._id === active.id
    );
    const newPos = imagesJumbotron.findIndex((item) => item._id === over.id);

    const updatedImages = arrayMove(imagesJumbotron, originalPos, newPos);
    setImagesJumbotron(updatedImages);

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/cms/jumbotron",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ images: updatedImages.map((img) => img._id) }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update order: ${response.statusText}`);
      }

      console.log("Order updated successfully");
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const onChangeImage = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const submitImage = async () => {
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

      if (!uploadResponse.ok)
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      const uploadedImageData = await uploadResponse.json();

      const newImage = {
        _id: uploadedImageData?.data?._id,
        name: uploadedImageData?.data?.name,
      };

      const responseJumbotron = await fetch(
        "http://localhost:3001/api/v1/cms/jumbotron",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images: [...imagesJumbotron, newImage] }),
        }
      );

      if (!responseJumbotron.ok)
        throw new Error(`Update failed: ${responseJumbotron.statusText}`);

      setImagesJumbotron((prev) => [...prev, newImage]);
      setImage(null);
      alert("Image uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const filteredImages = imagesJumbotron.filter((img) => img._id !== id);
    setImagesJumbotron(filteredImages);

    const responseJumbotron = await fetch(
      "http://localhost:3001/api/v1/cms/jumbotron",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: filteredImages }),
      }
    );

    if (responseJumbotron.ok) {
      alert("Image deleted successfully");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <main className="ml-12 mt-12 pb-24 space-y-8">
      <h3 className="text-md tracking-widest uppercase">Dashboard Jumbotron</h3>

      <div>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pictureUpload" className="text-muted-foreground">
              Add Jumbotron
            </Label>
            <Input id="pictureUpload" type="file" onChange={onChangeImage} />
          </div>
        </div>

        {image && (
          <div className="space-y-4 mt-4">
            <h3>Preview Gambar:</h3>
            <Image
              src={URL.createObjectURL(image)}
              alt="Selected"
              width={300}
              height={300}
            />
            <p className="text-muted-foreground">
              Pastikan ukuran gambarnya persegi (1600 x 960) px
            </p>
            <div className="space-x-4">
              <Button
                variant="destructive"
                onClick={() => {
                  setImage(null);
                  document.getElementById("pictureUpload").value = "";
                }}
              >
                Reset
              </Button>
              <Button onClick={submitImage} className="rounded-md">
                Add
              </Button>
            </div>
          </div>
        )}
      </div>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <Column images={imagesJumbotron} onDelete={handleDelete} />
      </DndContext>
    </main>
  );
};

export default JumbotronPage;
