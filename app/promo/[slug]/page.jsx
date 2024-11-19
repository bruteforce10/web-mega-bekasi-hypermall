import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BreadcrumbSection from "../_component/BreadcrumbSection";
import { LuCalendarHeart } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import Share from "@/app/directory/_component/Share";
import InnerHTML from "dangerously-set-html-content";
import moment from "moment";
import OtherRecomendation from "../_component/OtherRecomendation";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3001/api/v1/cms/promos/${slug}`, {
    cache: "no-cache",
  });
  return res.json();
};

export default async function PromoDetailPage({ params }) {
  const { slug } = await params;
  const { data } = await getData(slug);

  return (
    <main className="container mx-auto  lg:mt-12 mt-4">
      <BreadcrumbSection breadTwo="promo" breadThree={data.title} />
      <section className="flex md:flex-row flex-col gap-8 md:gap-12 mt-4">
        <div className="space-y-4 md:w-1/2">
          <Image
            src={`http://localhost:3001/${data.image.name}`}
            alt="megabekasi-hypermall"
            width={1080}
            height={1080}
            quality={100}
            className="w-full rounded-md object-cover "
          />
          <div className="space-y-2 max-md:hidden">
            <h3 className="text-2xl font-bold">{data.directory.title}</h3>
            <p className="text-muted-foreground">Location : {data.location}</p>
            {data.linkPromo && (
              <Link href={data.linkPromo} className="block">
                <Button variant="link" size="sm" className="text-black p-0 ">
                  more detail
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-4">
            <LuCalendarHeart className="w-12 h-12" />
            <h2 className="text-2xl uppercase font-bold">
              {moment(data.startPromo).format("DD MMM YYYY")} -{" "}
              {moment(data.endPromo).format("DD MMM YYYY")}
            </h2>
          </div>
          <Separator />
          <h1 className="h2">{data.title}</h1>
          <article className="prose">
            <InnerHTML html={data.description} />
          </article>
          <div className="space-y-2 md:hidden">
            <p className="text-muted-foreground">
              Location : Available on Level 6
            </p>
            {data.linkPromo && (
              <Link href={data.linkPromo} className="block">
                <Button variant="link" size="sm" className="text-black p-0 ">
                  more detail
                </Button>
              </Link>
            )}
          </div>
          <Share
            urlEmail={`http://localhost:3000/${data.slug}`}
            urlTwitter={`http://localhost:3000/${data.slug}`}
            urlWhatsapp={`http://localhost:3000/${data.slug}`}
            urlFacebook={`http://localhost:3000/${data.slug}`}
          />
        </div>
      </section>
      <OtherRecomendation id={data._id} />
    </main>
  );
}
