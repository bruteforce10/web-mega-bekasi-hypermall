import TextTitle from "@/components/TextTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

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
              <div key={index} className="rounded-xl overflow-hidden">
                <Image
                  src={"/dummy-promo.webp"}
                  width={600}
                  height={600}
                  alt="megabekasi-hypermall"
                  className="w-full object-cover"
                />
                <div className="p-4 bg-[#F1F5F9] flex flex-col items-baseline justify-between min-h-[180px] max-h-[300px]">
                  <p className="text-sm uppercase text-muted-foreground">
                    24 SEPT 2023
                  </p>
                  <h4 className="text-xl font-bold">
                    My Melody & Kuromi Lunar Town
                  </h4>
                  <Button variant="link" className="p-0 text-sm text-black">
                    lean more
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventPage;
