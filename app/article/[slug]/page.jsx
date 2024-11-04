import Share from "@/app/directory/_component/Share";
import Card from "@/app/event/_component/Card";
import BreadcrumbSection from "@/app/promo/_component/BreadcrumbSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <main className="container mx-auto flex-col flex items-center max-w-[800px]  lg:mt-12 mt-4">
      <BreadcrumbSection
        breadTwo="event"
        breadThree="Artfordable by Sidharta Auctioneer"
      />

      <article className="mt-12 space-y-8">
        <div className="flex flex-col items-center gap-3 ">
          <p className=" uppercase text-muted-foreground">03 OCT 2024</p>
          <Button variant="outline" className="uppercase">
            Featured News, Store Opening
          </Button>
          <h3 className="h3 text-3xl">Bringing Danish Joy to MBH</h3>
        </div>
        <Image
          src="/dummy-news.webp"
          alt="artikel-menu-mall-bekasi-hypermall"
          width={1920}
          height={1080}
          quality={100}
          className="object-cover w-full rounded-2xl h-[530px]"
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          dignissimos alias? Veniam pariatur facere ducimus distinctio
          laboriosam, soluta eum! Eveniet?
        </p>
        <Share
          urlEmail={"https://www.google.com"}
          urlTwitter={"https://www.google.com"}
          urlWhatsapp={"https://www.google.com"}
          urlFacebook={"https://www.google.com"}
        />
      </article>
      <div className="mt-[120px] space-y-8">
        <h2 className="text-2xl font-bold text-center">
          Other Recommendations
        </h2>
        <div className="flex max-lg:flex-wrap justify-center gap-8">
          {[...Array(2)].map((_, index) => (
            <Card
              key={index}
              image={"/dummy-opening-tenant.webp"}
              title={"Sawadikap – Thailand Culinary Festival"}
              date={"03 Oct 2024"}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
