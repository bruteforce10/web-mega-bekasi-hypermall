"use client";
import { facilities } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const IconTitle = ({ icon, title, subTitle }) => {
  return (
    <Link
      href="#"
      className=" text-white flex items-center  gap-4 hover:opacity-80"
    >
      <div className="w-12 h-12">{icon}</div>
      <h5 className="md:text-2xl text-xl font-medium uppercase">
        {title} <br /> {subTitle}
      </h5>
    </Link>
  );
};

const FacilitySection = () => {
  const pathname = usePathname();

  if (
    pathname === "/dashboard" ||
    pathname === "/dashboard/directory" ||
    pathname === "/dashboard/promo" ||
    pathname === "/dashboard/article" ||
    pathname === "/dashboard/event" ||
    pathname === "/dashboard/directory/add"
  ) {
    return null;
  }

  return (
    <section className=" bg-gradient-to-r mt-12 max-md:px-20  md:mt-24 py-16 from-primary to-[#FF3333]">
      <div className="px-2 mx-auto  container flex max-md:flex-col gap-12 xl:gap-24 max-xl:flex-wrap  justify-center md:items-center">
        {facilities.map((facility, index) => (
          <IconTitle
            key={index}
            icon={facility.icon}
            subTitle={facility.subTitle}
            title={facility.title}
          />
        ))}
      </div>
    </section>
  );
};

export default FacilitySection;
