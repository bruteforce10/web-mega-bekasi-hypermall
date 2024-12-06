import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CareerData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CareerPage() {
  const { title, desc, content, link } = CareerData;

  return (
    <main>
      <section>
        <div className="relative">
          <div className="text-white text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h3 className="h2 tracking-wider max-md:mb-2">{title}</h3>
            <p className="tracking-wider leading-tight">{desc}</p>
          </div>
          <Image
            src="/cover/about-us.webp"
            alt="promo-menu-mall-bekasi-hypermall"
            width={1920}
            height={1080}
            quality={100}
            className="h-full min-h-[120px] object-cover w-full"
          />
        </div>
      </section>

      <section className="container max-w-[1000px] mx-auto mt-8 text-center">
        <p className="text-muted-foreground font-bold text-xl mb-4">
          {content}
        </p>
        <Link href={link} className="block">
          <Button className="tracking-widest rounded-md">Click Here</Button>
        </Link>
        <Separator className="my-12 block" />
      </section>
    </main>
  );
}
