import Share from "@/app/directory/_component/Share";
import BreadcrumbSection from "@/app/promo/_component/BreadcrumbSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuCalendarHeart } from "react-icons/lu";
import Card from "../_component/Card";

export default function EventPage() {
  return (
    <main className="container mx-auto max-w-[1000px]  lg:mt-12 mt-4">
      <BreadcrumbSection
        breadTwo="event"
        breadThree="Artfordable by Sidharta Auctioneer"
      />
      <section className="flex  flex-col gap-8 md:gap-12 mt-4">
        <div className="space-y-4">
          <Image
            src="/dummy-promo.webp"
            alt="megabekasi-hypermall"
            width={1080}
            height={1080}
            quality={100}
            className="w-full rounded-md object-cover max-h-[500px] "
          />
        </div>
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-2">
            <LuCalendarHeart className="w-10 h-10" />
            <h2 className="text-2xl uppercase font-bold">
              01 Nov 2020 - 31 Aug 2021
            </h2>
          </div>
          <Separator />
          <h1 className="h2">Artfordable by Sidharta Auctioneer</h1>
          <p className="text-muted-foreground leading-loose pt-4">
            Artwork by: Arie Smit, Barli Sasmitawinata, Jeihan Sukmantoro, I
            Dewa Putu Mokoh, Han Snel, Krijono, Maria Tjui, Nyoman Gunarsa,
            Rosar, Popo Iskandar, Tresna Suryawan, Amrus Natalsya, Tatang
            Kuntjoro, Mozes Misdy, Srihadhy, Heri Kris, Gung Man, Jopram, Johan
            Abe, Roby Lukita, Bagas Rachelma, Osyadha Ramadhanna, Tezzar Aris
            Sandy, Laila Wulancahya and more. Future VintageA late 19th - early
            20th century Peranakan Chinese carved red and gold bridal sideboard,
            a set of six of 20th century carved teak wood side chairs for dining
            table, a six panels of 20th century vintage Chinese lacquer wood
            floor screen, a late 19th - early 20th century European cranbarry
            glass epergne, a Chinese blue and white Dragons vase and more
          </p>
          <p className="text-muted-foreground">
            <span className="text-lg text-black font-bold">Location : </span>{" "}
            Lv2 North Wing Area
          </p>
          <Button variant="link" className="p-0 text-md text-black normal-case">
            View on Instagram
          </Button>
          <Share
            urlEmail={"https://www.google.com"}
            urlTwitter={"https://www.google.com"}
            urlWhatsapp={"https://www.google.com"}
            urlFacebook={"https://www.google.com"}
          />
        </div>
      </section>
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
