import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ image, title, date, slug }) => {
  return (
    <div className="rounded-xl overflow-hidden">
      <Image
        src={image}
        width={600}
        height={600}
        alt="megabekasi-hypermall"
        className="w-full object-cover"
      />
      <div className="p-4 bg-[#F1F5F9] flex flex-col items-baseline justify-between min-h-[170px] max-h-[300px]">
        <p className="text-sm uppercase text-muted-foreground">{date}</p>
        <h4 className="text-xl font-bold uppercase w-3/4">{title}</h4>
        <Link href={`/event/${slug}`}>
          <Button variant="link" className="p-0 text-sm text-black">
            learn more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
