import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ title, image, directory, location, slug }) => {
  return (
    <Link href={`/promo/${slug}`} className="block">
      <div className="space-y-2">
        <Image
          src={`http://localhost:3001/${image}`}
          alt="megabekasi-hypermall"
          width={300}
          height={300}
          quality={100}
          className="md:w-[300px] w-full md:h-[300px] object-cover rounded-lg"
        />
        <div className="space-y-2">
          <Badge>{directory}</Badge>

          <h4 className="text-xl font-bold hover:underline">{title}</h4>

          <p>{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
