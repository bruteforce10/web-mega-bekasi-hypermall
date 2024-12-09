"use client";
import { facilities } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const IconTitle = ({ icon, title, subTitle, popup, link }) => {
  return !popup ? (
    <Link
      href={link}
      className=" text-white flex items-center  gap-4 hover:opacity-80"
    >
      <div className="w-14 h-14">{icon}</div>
      <h5 className="md:text-2xl text-xl font-medium uppercase">
        {title} <br /> {subTitle}
      </h5>
    </Link>
  ) : (
    <Dialog>
      <DialogTrigger className=" text-white flex items-center  gap-4 hover:opacity-80">
        <div className="w-14 h-14">{icon}</div>
        <h5 className="md:text-2xl text-xl text-start font-medium uppercase">
          {title} <br /> {subTitle}
        </h5>
      </DialogTrigger>
      <DialogContent className="flex items-center gap-4">
        <Image
          src={"/icon/logo-mbh.webp"}
          width={100}
          height={100}
          alt="megabekasi-hypermall"
        />
        <div>
          <DialogTitle className="mb-1">Download Now</DialogTitle>
          <DialogDescription>
            Join now with over 81388+ customers. <br />
            Available on iOS and Android.
          </DialogDescription>
          <div className="flex gap-4 items-center mt-2">
            <Link href={"#"}>
              <Image
                src={"/icon/app-store.png"}
                width={100}
                height={100}
                alt="megabekasi-hypermall"
              />
            </Link>
            <Link href={"#"}>
              <Image
                src={"/icon/google-play.png"}
                width={100}
                height={100}
                alt="megabekasi-hypermall"
              />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FacilitySection = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/")) {
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
            popup={facility.popup}
            link={facility.link}
          />
        ))}
      </div>
    </section>
  );
};

export default FacilitySection;
