import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Card = ({ image, title, date }) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <Image
        src={image}
        width={600}
        height={600}
        alt="megabekasi-hypermall"
        className="w-full object-cover"
      />
      <div className="p-4 bg-[#F1F5F9] flex flex-col items-baseline justify-between min-h-[180px] max-h-[300px]">
        <p className="text-sm uppercase text-muted-foreground">{date}</p>
        <h4 className="text-xl font-bold">{title}</h4>
        <Button variant="link" className="p-0 text-sm text-black">
          learn more
        </Button>
      </div>
    </div>
  );
};

export default Card;
