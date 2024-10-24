import TextTitle from "@/components/TextTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Card from "./_component/Card";

const EventPage = () => {
  return (
    <main>
      <Image
        src="/cover/event.webp"
        alt="event-menu-mall-bekasi-hypermall"
        width={1920}
        height={1080}
        quality={100}
        className="h-full min-h-[120px] object-cover w-full"
      />
      <section className="container mx-auto mt-12 space-y-8 lg:space-y-12">
        <div className="relative ">
          <div className="bg-gradient-to-b absolute rounded-2xl z-[-1] bottom-0 h-[140px]  w-full  from-transparent to-black/70" />
          <Image
            src={"/dummy-opening-tenant.webp"}
            alt="megabekasi-hypermall"
            width={600}
            className="object-cover w-full rounded-2xl h-[530px]"
            height={600}
          />
          <div className="absolute px-6  sm:left-8 sm:px-4 text-white bottom-8">
            <p className="text-lg uppercase text-medium mb-2 tracking-wider">
              HAPPENING NOW
            </p>
            <h2 className="h2">Sawadikap – Thailand Culinary Festival</h2>
            <p className="font-thin">03 Oct 2024</p>
            <Button variant="link" className="p-0 block">
              lean more
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <TextTitle title={"Throwback Moments"} className={"text-start"} />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                image={"/dummy-opening-tenant.webp"}
                title={"Sawadikap – Thailand Culinary Festival"}
                date={"03 Oct 2024"}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventPage;
