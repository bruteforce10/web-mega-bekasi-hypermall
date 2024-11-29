import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoSearch } from "react-icons/io5";
import Card from "./_component/Card";
import Paginantion from "@/components/Paginantion";

const getData = async (page, limit) => {
  const res = await fetch(
    `http://localhost:3001/api/v1/cms/articles?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data;
};

export default async function ArticlePage({ searchParams }) {
  const { page = 1, limit = 2 } = await searchParams;
  const { data } = await getData(page, limit);

  console.log(data);

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
      <section className="container max-w-[1200px] mx-auto mt-12 space-y-8 lg:space-y-12">
        {/* <div className="relative ">
          <Image
            src={`http://localhost:3001/${articleNewOpening?.image?.name}`}
            alt={articleNewOpening?.title}
            width={600}
            className="object-cover w-full rounded-2xl h-[450px]"
            height={600}
          />
          <div className="absolute bottom-0 left-0 from-transparent rounded-2xl to-black/80 right-0 bg-gradient-to-b h-60 " />
          <div className="absolute  left-8 px-4 text-white bottom-8">
            <p className="text-lg uppercase text-medium mb-2">
              Featured News, Store Opening
            </p>
            <h2 className="h2 mb-3">{articleNewOpening?.title}</h2>
            <Link href={`/article/${articleNewOpening?.slug}`}>
              <Button className="px-6">EXPLORE</Button>
            </Link>
          </div>
        </div> */}
        <div className="flex gap-8 max-lg:flex-col-reverse xl:gap-12">
          <div className="w-full flex-col flex gap-12 ">
            {data?.data.map((item, index) => (
              <>
                <Card
                  key={index}
                  link={`/article/${item?.slug}`}
                  image={`http://localhost:3001/${item?.image?.name}`}
                  title={item?.title}
                  description={item?.metaDescription}
                />
                <Separator className="last:hidden" />
              </>
            ))}
            <Paginantion
              limit={limit}
              currentPage={data?.pagination?.currentPage}
              totalPages={data?.pagination?.totalPages}
            />
          </div>

          <Separator
            orientation="vertical"
            className="min-h-screen  max-lg:hidden lg:sticky lg:top-[120px]"
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
}
