import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Thumb = ({ images, title, slug }) => {
  return (
    <div className="relative ">
      <Image
        src={`http://localhost:3001/${images}`}
        alt={title}
        width={600}
        className="object-cover w-full rounded-2xl h-[450px]"
        height={600}
      />
      <div className="absolute bottom-0 left-0 from-transparent rounded-2xl to-black/80 right-0 bg-gradient-to-b h-full " />
      <div className="absolute  left-8 px-4 text-white bottom-8">
        <p className="text-lg uppercase text-medium mb-2">
          Featured News, Store Opening
        </p>
        <h2 className="h2 mb-3">{title}</h2>
        <Link href={`/article/${slug}`}>
          <Button className="px-6">EXPLORE</Button>
        </Link>
      </div>
    </div>
  );
};

export default Thumb;
