import React from "react";
import TextTitle from "./TextTitle";
import Image from "next/image";
import { Button } from "./ui/button";

const OpeningTenantSection = () => {
  return (
    <section className="bg-cover  lg:bg-right-bottom flex max-md:flex-col bg-no-repeat bg-[url('/bg-opening-tenant.webp')]">
      <Image
        src={"/dummy-opening-tenant.webp"}
        alt="megabekasi-hypermall"
        width={600}
        className="grow  object-cover max-md:h-[300px] w-full md:w-[400px] lg:max-w-[600px]"
        height={600}
      />
      <div className="flex flex-col max-w-[1200px]  md:px-8 lg:px-12 max-md:py-16 md:justify-center ">
        <TextTitle
          className={"text-white text-center md:text-start mt-0"}
          title={"Bringing Danish Joy to MBH"}
          subTitle={"Featured News, Store Opening"}
        />
        <div className="flex space-x-2 max-md:justify-center items-center mt-4">
          <Button>explore</Button>
          <Button variant={"link"}>discover</Button>
        </div>
      </div>
    </section>
  );
};

export default OpeningTenantSection;
