import Share from "@/app/directory/_component/Share";
import BreadcrumbSection from "@/app/promo/_component/BreadcrumbSection";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Image from "next/image";
import React from "react";
import InnerHTML from "dangerously-set-html-content";
import OtherRecommendation from "../_component/OtherRecommendation";

const getData = async (params) => {
  const res = await fetch(
    `http://localhost:3001/api/v1/cms/articles/${params}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
};

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const { data } = await getData(slug);
  const { title, description, createdAt, image, newsOpening } = data;

  return (
    <main className="container mx-auto flex-col flex items-center max-w-[800px]  lg:mt-12 mt-4">
      <BreadcrumbSection breadTwo="article" breadThree={title} />

      <article className="mt-12 space-y-8">
        <div className="flex flex-col items-center gap-3 ">
          <p className=" uppercase text-muted-foreground">
            {moment(createdAt).format("DD MMMM YYYY")}
          </p>
          {newsOpening && (
            <Button variant="outline" className="uppercase">
              Featured News, Store Opening
            </Button>
          )}
          <h3 className="h3 text-3xl">{title}</h3>
        </div>
        <Image
          src={`http://localhost:3001/${image.name}`}
          alt={`artikel-megabekasihypermall-${slug}`}
          width={1920}
          height={1080}
          quality={100}
          className="object-cover w-full rounded-2xl aspect-video"
        />
        <article className="prose">
          <InnerHTML html={description} />
        </article>
        <Share
          urlEmail={`http://localhost:3000/article/${slug}`}
          urlTwitter={`http://localhost:3000/article/${slug}`}
          urlWhatsapp={`http://localhost:3000/article/${slug}`}
          urlFacebook={`http://localhost:3000/article/${slug}`}
        />
      </article>
      <OtherRecommendation slug={slug} />
    </main>
  );
}
