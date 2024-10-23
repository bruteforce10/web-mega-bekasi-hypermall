"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ImageViewList = ({ coverId, image }) => {
  const [imageData, setImageData] = useState(null);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/v1/cms/cover-directorys/${coverId}`
    );
    setImageData(res?.data?.data?.images);
  };

  useEffect(() => {
    if (coverId) {
      getData();
    }

    return () => {};
  }, [coverId, image]);

  return (
    <div className="p-4 rounded-md flex flex-wrap gap-4 border-gray-300 border-dashed h-fit w-full border-2">
      {imageData?.map((item, index) => (
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
            size="sm"
            className="rounded-full h-7 w-7 absolute -top-2 -right-2 hover:bg-red-600"
          >
            X
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImageViewList;
