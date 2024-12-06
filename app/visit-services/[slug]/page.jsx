import BreadcrumbSection from "@/app/promo/_component/BreadcrumbSection";
import { ServicesData } from "@/lib/data";
import Image from "next/image";
import React from "react";

export default async function DetailVisitServices({ params }) {
  const { facility } = ServicesData;
  const { slug } = await params;
  const facilityFound = facility.find((item) => item.slug === slug);

  return (
    <main className="container mx-auto flex lg:flex-row flex-col-reverse mt-12 pb-16  md:mt-24  gap-4 md:gap-12">
      <div>
        <BreadcrumbSection breadTwo={slug} />
        <div className="space-y-2 mt-4">
          <h2 className="h3 text-4xl">{facilityFound.title}</h2>
          <ul className="list-disc ml-5">
            {facilityFound.location.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p className="leading-relaxed">{facilityFound.description}</p>
        </div>
      </div>
      <Image
        src={facilityFound.image}
        alt={`${slug}-megabekasi-hypermall`}
        className="object-cover lg:w-[500px] rounded-md"
        width={1920}
        height={1080}
        quality={100}
      />
    </main>
  );
}
