import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ image, title, date, slug }) => {
  return (
    <div className="rounded-xl  w-[300px] overflow-hidden">
      <Image
        src={image}
        width={600}
        height={600}
        alt="megabekasi-hypermall"
        className="w-full object-cover aspect-video"
      />
      <div className="p-4 bg-[#F1F5F9] flex flex-col items-baseline justify-between min-h-[170px] max-h-[300px]">
        <p className="text-sm uppercase text-muted-foreground p">{date}</p>
        <h4 className="text-xl font-bold uppercase  line-clamp-2">{title}</h4>

        <Link href={slug}>
          <Button variant="link" className="p-0 text-sm text-black">
            learn more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
