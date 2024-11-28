import Image from "next/image";
import React, { Suspense } from "react";
import SelectOps from "./_component/SelectOps";
import { Button } from "@/components/ui/button";
import Card from "./_component/Card";
import { DirectoryOps } from "@/lib/data";
import SearchInput from "./_component/SearchInput";
import LoadingSkeleton from "./_component/LoadingSkelton";
import Link from "next/link";
import LoadMoreButton from "./_component/LoadMoreButton";
import LoadingComponent from "@/components/LoadingComponent";

const getData = async (key, floor, category) => {
  const res = await fetch(
    `http://localhost:3001/api/v1/cms/directory?title=${key}&floor=${floor}&category=${category}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
};

export default async function DirectoryPage({ searchParams }) {
  const { floor, categories } = DirectoryOps;
  const { key, floorSearch, category, limit = 8 } = await searchParams;
  const { data } = await getData(key, floorSearch, category);
  const lengthData = data.length;

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
      <Suspense fallback={<LoadingSkeleton />}>
        <section className="container flex relative max-lg:flex-col max-lg:items-center gap-12 mx-auto mt-12">
          <aside className="space-y-4 lg:w-1/3 w-full lg:sticky lg:top-[120px] h-fit">
            <h5 className="text-xl uppercase text-[#C82435] font-medium">
              search tenant
            </h5>
            <SearchInput value={key} limit={lengthData} />
            <SelectOps
              data={floor}
              title="By Floor"
              name="floor"
              limit={lengthData}
            />
            <SelectOps
              data={categories}
              title="All Category"
              name="category"
              limit={lengthData}
            />
            <Link
              href="/directory
            "
              className="block"
            >
              <Button className="w-full rounded-lg">Reset Filter</Button>
            </Link>
          </aside>
          <div className="flex flex-col items-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.slice(0, limit).map((item, index) => (
                <Card
                  key={index}
                  link={`/directory/${item.slug}`}
                  title={item.title}
                  floor={item.location}
                  image={item.images.images[0].name}
                />
              ))}
              {data.length === 0 && (
                <p className="text-xl text-muted-foreground">
                  No Directory Found
                </p>
              )}
            </div>
            {lengthData > limit && !category && !floorSearch && (
              <LoadMoreButton limit={limit} />
            )}
          </div>
        </section>
      </Suspense>
    </main>
  );
}
