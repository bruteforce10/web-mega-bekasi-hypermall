import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ link, title, floor, image }) => {
  return (
    <Link href={link} className="group w-fit h-fit">
      <div className=" group-hover:scale-[95%] transition-all duration-300 rounded-lg overflow-hidden w-fit h-fit">
        <Image
          src={"http://localhost:3001/" + image}
          alt={title}
          width={180}
          height={180}
          className="max-md:w-screen aspect-video w-full object-cover"
        />
        <div className=" px-5 bg-[#F1F5F9] border-r-[1px] h-[120px]  items-center justify-center border-b-[1px] border-l-[1px]  rounded-b-lg  text-center flex flex-col gap-2 w-full  ">
          <p className="font-bold tracking-wide uppercase leading-tight  text-xl">
            {title}
          </p>
          <div className=" text-sm group-hover:translate-y-0 transition-all duration-300 translate-y-20">
            {floor}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
