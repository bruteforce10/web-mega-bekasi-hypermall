import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ link, title, description, image }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <Link href={link} className="hover:text-primary hover:underline">
          <h3 className="text-2xl text-center font-medium tracking-wide mt-4">
            {title}
          </h3>
        </Link>
        <div className="w-20 h-[1.5px] bg-muted-foreground rounded-full mt-2 mx-auto" />
      </div>
      <Image
        src={image}
        width={600}
        height={600}
        alt="megabekasi-hypermall"
        className="w-full rounded-2xl aspect-video object-cover"
      />
      <div className="flex flex-col gap-4 items-center">
        <p className="leading-loose">{description}</p>
        <Link href={link}>
          <Button
            variant="outline"
            className="text-muted-foreground  text-sm tracking-wide uppercase"
          >
            lean more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
