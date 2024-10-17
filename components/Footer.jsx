import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { footerData } from "@/lib/data";

const ListTitle = ({ data }) => {
  return (
    <div>
      <h3 className="text-md tracking-widest uppercase">{data.title}</h3>
      <ul>
        {data?.items?.map((item, index) => (
          <li key={index} className="text-muted-foreground hover:text-primary">
            <Link href={item.link || "/"}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const { address, socialMedia, visitInformation, mbhConnect, contactUs } =
    footerData;

  return (
    <footer className="container mx-auto px-2  pt-24">
      <div className="md:gap-24 gap-12 flex justify-center max-md:flex-col max-md:px-12 max-lg:flex-wrap">
        <div className="space-y-4">
          <Image
            src="/logo.svg"
            alt="megabekasi-hypermall"
            width={100}
            height={100}
          />
          <p className="text-muted-foreground max-w-[350px]">{address}</p>
          <div className="space-x-2">
            {socialMedia.map((item, index) => (
              <Link href={item.link} key={index}>
                <Button variant="ghost" size="icon">
                  {item.icon}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <ListTitle data={visitInformation} />
        <ListTitle data={mbhConnect} />
        <ListTitle data={contactUs} />
      </div>
      <Separator className="mt-12 mb-4 " />
      <p className="text-muted-foreground text-center pb-8 max-md:text-sm">
        Mega Bekasi Hypermall © 2000-2023, All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
