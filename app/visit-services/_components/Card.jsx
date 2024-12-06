import React from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const CardServices = ({ image, title, slug }) => {
  return (
    <Link href={`/visit-services/${slug}`}>
      <Card className="overflow-hidden">
        <Image
          src={image}
          alt={`${title}-megabekasi-hypermall`}
          width={400}
          height={400}
          className="w-full object-cover"
        />
        <CardHeader className="h-[100px] items-center justify-center">
          <CardTitle className="leading-tight text-center">{title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default CardServices;
