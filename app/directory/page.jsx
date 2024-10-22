import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
import SelectOps from "./_component/SelectOps";
import { Button } from "@/components/ui/button";
import Card from "./_component/Card";
import { DirectoryOps } from "@/lib/data";

export default function DirectoryPage() {
  const { floor, categories } = DirectoryOps;
  return (
    <main>
      <Image
        src="/cover/directory.webp"
        alt="directory-menu-mall-bekasi-hypermall"
        width={1920}
        height={1080}
        quality={100}
        className="h-full min-h-[120px] object-cover w-full"
      />
      <section className="container flex relative max-lg:flex-col max-lg:items-center gap-12  mx-auto mt-12">
        <aside className="space-y-4 lg:w-1/3 w-full lg:sticky lg:top-[120px] h-fit">
          <h5 className="text-xl uppercase text-[#C82435] font-medium">
            search tenant
          </h5>
          <div className="relative w-full">
            <IoSearch className="absolute text-2xl left-2 top-[50%] opacity-70 translate-y-[-50%]" />
            <Input placeholder="Filter By Keyword" className="pl-10 w-full" />
          </div>
          <SelectOps data={floor} title="By Floor" />
          <SelectOps data={categories} title="All Category" />
          <Button className="w-full rounded-lg">Reset Filter</Button>
        </aside>
        <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-4">
          {[...Array(24)].map((_, index) => (
            <Card
              key={index}
              link="/directory/tenant/1"
              title="Mall Bekasi"
              floor="Ground 1, Level B2"
              alt="mall-bekasi-hypermall"
              image="/directory-dummy.webp"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
