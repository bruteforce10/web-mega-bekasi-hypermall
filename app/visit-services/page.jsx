import React from "react";
import Tab from "../visit-getting-here/_components/Tab";
import Image from "next/image";
import EachUtils from "@/utils/EachUtils";
import { ServicesData, visit } from "@/lib/data";
import CardServices from "./_components/Card";

export default function PageServices() {
  const { content, facility } = ServicesData;

  return (
    <main>
      <section>
        <div className="relative">
          <div className="text-white text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {
              <EachUtils
                of={visit}
                render={(item, _) => (
                  <>
                    <h3 className="h2 tracking-wider max-md:mb-2">
                      {item.title}
                    </h3>
                    <p className="tracking-wider leading-tight">
                      {item.subTitle}
                    </p>
                  </>
                )}
              />
            }
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
      <Tab />
      <section className="container mx-auto mt-12">
        <p>{content}</p>
        <div className="mt-12 gap-8 justify-center items-center flex">
          {facility.map((item, index) => (
            <CardServices
              key={index}
              title={item.title}
              slug={item.slug}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
