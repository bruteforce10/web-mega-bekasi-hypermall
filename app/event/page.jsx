import TextTitle from "@/components/TextTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Card from "./_component/Card";
import moment from "moment";

const getData = async () => {
  const res = await fetch(`http://localhost:3001/api/v1/cms/events`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function EventPage() {
  const { data } = await getData();
  const HeadlineNewsData = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];
  const filterData = data.filter((item) => item._id !== HeadlineNewsData._id);

  console.log(HeadlineNewsData);
  console.log(filterData);

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
      <section className="container max-w-[1000px] mx-auto mt-12 space-y-8 lg:space-y-12">
        <div className="rounded-xl overflow-hidden">
          <Image
            src={`http://localhost:3001/${HeadlineNewsData?.image?.name}`}
            alt="megabekasi-hypermall"
            width={600}
            className="object-cover w-full  "
            height={600}
            quality={97}
          />
          <div className="p-6 bg-[#F1F5F9] space-y-4  ">
            <p className="text-lg uppercase text-medium  tracking-wider">
              HAPPENING NOW
            </p>
            <div>
              <h2 className="h2">Sawadikap – Thailand Culinary Festival</h2>
              <p className="font-thin">
                {moment(HeadlineNewsData.createdAt).format("DD MMM YYYY")}
              </p>
            </div>
            <Button variant="link" className="p-0 block text-black">
              lean more
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filterData.map((item, index) => (
              <Card
                key={index}
                image={`http://localhost:3001/${item?.image?.name}`}
                title={item.title}
                slug={item.slug}
                date={moment(item.createdAt).format("DD MMM YYYY")}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
