import Image from "next/image";
import React from "react";
import SelectOps from "./_component/SelectOps";
import { Button } from "@/components/ui/button";
import Card from "./_component/Card";
import { DirectoryOps } from "@/lib/data";
import SearchInput from "./_component/SearchInput";

const getData = async (key, floor, category) => {
  const res = await fetch(
    `http://localhost:3001/api/v1/cms/directory?title=${key}&floor=${floor}&category=${category}`,
    {
      cache: "no-store",
    }
  );
  return res.json();
};

export default async function DirectoryPage({ searchParams }) {
  const { floor, categories } = DirectoryOps;
  const { key, floorSearch, category } = await searchParams;
  const { data } = await getData(key, floorSearch, category);

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

          <SearchInput value={key} />
          <SelectOps data={floor} title="By Floor" />
          <SelectOps data={categories} title="All Category" />
          <Button className="w-full rounded-lg">Reset Filter</Button>
        </aside>
        <div className="w-full grid grid-cols-1  md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <Card
              key={index}
              link="/directory/tenant/1"
              title={item.title}
              floor={item.location}
              image={item.images[0].name}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
