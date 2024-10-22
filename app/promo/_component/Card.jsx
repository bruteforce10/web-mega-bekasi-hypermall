import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

const Card = () => {
  return (
    <div className="space-y-2">
      <Image
        src={"/dummy-promo.webp"}
        alt="megabekasi-hypermall"
        width={300}
        height={300}
        quality={100}
        className="md:w-[300px] w-full md:h-[300px] object-cover rounded-lg"
      />
      <div className="space-y-2">
        <Badge>Teh Kotjok</Badge>
        <h4 className="text-xl font-bold">Beli 1 Gratis Varial All Large 1</h4>
        <p>Location: Lt. 2</p>
      </div>
    </div>
  );
};

export default Card;
