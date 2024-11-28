"use client";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect } from "react";
import Column from "./_component/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImagesJumbotron,
  setJumbotronImages,
} from "@/app/redux/directory/directorySlicer";

const JumbotronPage = () => {
  const [task, setTask] = React.useState([
    {
      id: 1,
      title: "Task 1",
    },
    {
      id: 2,
      title: "Task 2",
    },
  ]);
  const [image, setImage] = React.useState(null);
  const { imagesJumbotron } = useSelector((state) => state.directory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImagesJumbotron());
    console.log(imagesJumbotron);
  }, [dispatch]);

  const getTaskPos = (id) => task.findIndex((item) => item.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;
    setTask((task) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(task, originalPos, newPos);
    });
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

      if (!uploadResponse.ok) {
        throw new Error(`Image upload failed: ${uploadResponse.statusText}`);
      }

      const uploadedImageData = await uploadResponse.json();

      if (uploadedImageData) {
        // Tambahkan ID gambar baru ke Redux state
        dispatch(setJumbotronImages(uploadedImageData?.data?._id));

        // Update jumbotron dengan array yang diperbarui
        const responseJumbotron = await fetch(
          "http://localhost:3001/api/v1/cms/jumbotron",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              images: [...imagesJumbotron, uploadedImageData?.data?._id], // Tambahkan ID baru
            }),
          }
        );

        if (!responseJumbotron.ok) {
          throw new Error(
            `Image upload failed: ${responseJumbotron.statusText}`
          );
        }
        alert("Image uploaded successfully");
        setImage(null);
        const input = document.getElementById("pictureUpload");
        input.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <main className="ml-12  mt-12 pb-24 space-y-8">
      <h3 className="text-md tracking-widest uppercase">Dashboard Jumbotron</h3>

      <div>
        <div className="space-y-4 ">
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
              pastikan ukuran gambarnya persegi (1080x1080)
            </p>
            <div className="space-x-4">
              <Button
                variant="destructive"
                onClick={() => {
                  setImage(null);
                  const input = document.getElementById("pictureUpload");
                  input.value = "";
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
        <Column tasks={task} />
      </DndContext>
    </main>
  );
};

export default JumbotronPage;
