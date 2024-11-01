"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageViewList = ({ image }) => {
  const [dataImage, setDataImage] = useState(null);

  useEffect(() => {
    setDataImage(image?.images);
  }, [image]);

  const deleteImage = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus gambar ini?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/cms/cover-directorys/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: image?.title }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete image");
        }

        const data = await response.json();

        if (data) {
          const newData = dataImage.filter((item) => item._id !== id);
          setDataImage(newData);

          const responseDelete = await fetch(
            `http://localhost:3001/api/v1/cms/images/${id}`,
            {
              method: "DELETE",
            }
          );

          if (!responseDelete.ok) {
            throw new Error("Failed to delete image");
          }

          alert("Image deleted successfully");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between">
        <h3 className="text-xl mb-2 font-semibold">{image?.title}</h3>
        <Button
          variant="destructive"
          onClick={() => {
            const question = window.confirm(
              "Apakah Anda yakin ingin menghapus semua gambar ini dan akan direfresh kembali?"
            );

            if (question) {
              setDataImage(null);
              window.localStorage.removeItem("coverId");
              window.location.reload();
            }
          }}
        >
          Reset
        </Button>
      </div>
      <div className="p-4 rounded-md flex flex-wrap gap-4 border-gray-300 border-dashed h-fit w-full border-2">
        {dataImage?.map((item, index) => (
          <div className="relative w-fit " key={index}>
            <Image
              src={`http://localhost:3001/${item.name}`}
              alt="megabekasi-hypermall"
              className="rounded-md"
              height={300}
              width={300}
            />
            <Button
              variant="destructive"
              onClick={() => deleteImage(item._id)}
              size="sm"
              className="rounded-full h-7 w-7 absolute -top-2 -right-2 hover:bg-red-600"
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageViewList;
