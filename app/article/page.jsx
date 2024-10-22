import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoSearch } from "react-icons/io5";

const ArticlePage = () => {
  return (
    <main>
      <Image
        src="/cover/articles.webp"
        alt="artikel-menu-mall-bekasi-hypermall"
        width={1920}
        height={1080}
        quality={100}
        className="h-full min-h-[120px] object-cover w-full"
      />
      <section className="container mx-auto mt-12 space-y-8 lg:space-y-12">
        <div className="relative ">
          <div className="bg-gradient-to-b absolute rounded-2xl z-[-1] bottom-0 h-[140px]  w-full  from-transparent to-black/70" />
          <Image
            src={"/dummy-opening-tenant.webp"}
            alt="megabekasi-hypermall"
            width={600}
            className="object-cover w-full rounded-2xl h-[450px]"
            height={600}
          />
          <div className="absolute  left-8 px-4 text-white bottom-8">
            <p className="text-lg uppercase text-medium mb-2">
              Featured News, Store Opening
            </p>
            <h2 className="h2 mb-6">Bringing Danish Joy to MBH</h2>
            <div>
              <Button className="px-6">EXPLORE</Button>
              <Button variant="link">DISCOVER</Button>
            </div>
          </div>
        </div>
        <div className="flex gap-8 max-lg:flex-col-reverse xl:gap-12">
          <div className="w-full">
            <div className="space-y-4">
              <Image
                src={"/dummy-news.webp"}
                width={600}
                height={600}
                alt="megabekasi-hypermall"
                className="w-full rounded-2xl h-[450px] object-cover"
              />
              <Link href={"/#"} className="hover:text-primary hover:underline">
                <h3 className="text-2xl font-medium tracking-wide mt-4">
                  Menyambut Musim Liburan, Sweet Icescape 2024 Bersiap Kembali
                  Meriahkan Liburanmu!
                </h3>
              </Link>
              <p className="leading-loose">
                Bertualang menuju alam semesta yang menakjubkan. Serunya lagi,
                bisa Menyambut musim liburan sekolah tahun ini, Summarecon Mall
                Kelapa Gading kembali menghadirkan Sweet Icescape bulan Juni
                2024!
              </p>
              <Button variant="link" className="text-black p-0 text-lg">
                lean more
              </Button>
            </div>
          </div>

          <Separator
            orientation="vertical"
            className="min-h-screen max-lg:hidden"
          />

          <aside className="space-y-4 lg:w-1/2 w-full lg:sticky lg:top-[120px] h-fit">
            <div className="relative w-full">
              <IoSearch className="absolute text-2xl left-2 top-[50%] opacity-70 translate-y-[-50%]" />
              <Input placeholder="Filter By Keyword" className="pl-10 w-full" />
            </div>
            <h5 className="text-xl uppercase text-[#C82435] font-medium max-lg:hidden">
              Latest Press Release
            </h5>
            <div className="flex items-center gap-4 max-lg:hidden">
              <Image
                src={"/dummy-news.webp"}
                width={600}
                height={600}
                alt="megabekasi-hypermall"
                className="w-1/3 rounded-md "
              />
              <div className="w-full">
                <h4 className="line-clamp-2 font-medium">
                  Menyambut Musim Liburan, Sweet Icescape 2024 Bersiap Kembali
                  Meriahkan Liburanmu!
                </h4>
                <p>August 28, 2024 - 11:13 am</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ArticlePage;
