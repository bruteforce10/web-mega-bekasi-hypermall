import Share from "@/app/directory/_component/Share";
import BreadcrumbSection from "@/app/promo/_component/BreadcrumbSection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuCalendarHeart } from "react-icons/lu";
import Card from "../_component/Card";
import moment from "moment";
import InnerHTML from "dangerously-set-html-content";
import OtherRecomendation from "../_component/OtherRecomendation";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3001/api/v1/cms/events/${slug}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function EventPage({ params }) {
  const { slug } = await params;
  const { data } = await getData(slug);

  return (
    <main className="container mx-auto max-w-[1000px]  lg:mt-12 mt-4">
      <BreadcrumbSection breadTwo="event" breadThree={data?.title} />
      <section className="flex  flex-col gap-8 md:gap-12 mt-4">
        <div className="space-y-4">
          <Image
            src={`http://localhost:3001/${data?.image?.name}`}
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
              {moment(data?.startEvent).format("DD MMMM YYYY")} -{" "}
              {moment(data?.endEvent).format("DD MMMM YYYY")}
            </h2>
          </div>
          <Separator />
          <h1 className="h2">{data?.title}</h1>
          <article className="prose">
            <InnerHTML html={data?.description} />
          </article>
          <p className="text-muted-foreground">
            <span className="text-lg text-black font-bold">Location : </span>{" "}
            {data?.location}
          </p>
          <Link href={data?.linkInstagram} target="_blank">
            <Button
              variant="link"
              className="p-0 text-md text-black normal-case"
            >
              View on Instagram
            </Button>
          </Link>
          <Share
            urlEmail={`localhost:3000/event/${data?.slug}`}
            urlTwitter={`localhost:3000/event/${data?.slug}`}
            urlWhatsapp={`localhost:3000/event/${data?.slug}`}
            urlFacebook={`localhost:3000/event/${data?.slug}`}
          />
        </div>
      </section>
      <OtherRecomendation slug={slug} />
    </main>
  );
}
