import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ link, title, floor, alt, image }) => {
  return (
    <Link href={link} className="group w-fit h-fit">
      <div className="relative group-hover:scale-[95%] transition-all duration-300 rounded-lg overflow-hidden w-fit h-fit">
        <Image
          src={image}
          alt={alt}
          width={280}
          height={280}
          className="max-md:w-screen max-md:object-cover"
        />
        <div className="absolute group-hover:scale-110 transition-all duration-300 left-[50%] text-white text-center z-10 -translate-x-1/2 bottom-5 w-full  ">
          <p className="font-bold  text-xl">{title}</p>
          <div className=" text-sm">{floor}</div>
        </div>
        <div className=" bg-gradient-to-b h-24 absolute left-0 right-0 bottom-0  from-transparent to-black/70 " />
      </div>
    </Link>
  );
};

export default Card;
