import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import Card from "./_component/Card";
import Paginantion from "@/components/Paginantion";
import Thumb from "./_component/Thumb";
import InputSearch from "./_component/InputSearch";

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

const getDataAll = async () => {
  const res = await fetch(`http://localhost:3001/api/v1/cms/articles`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function ArticlePage({ searchParams }) {
  const { page = 1, limit = 2 } = await searchParams;
  const { data } = await getData(page, limit);
  const { data: dataAll } = await getDataAll();
  const findNewsOpening = dataAll?.data
    ?.filter((item) => item?.newsOpening === true)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  const randomData = dataAll?.data?.sort(() => Math.random() - 0.5).slice(0, 3);

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
        <Thumb
          images={findNewsOpening?.image?.name}
          title={findNewsOpening?.title}
          slug={findNewsOpening?.slug}
        />
        <div className="flex gap-8 max-lg:flex-col-reverse xl:gap-12">
          <div className="w-full flex-col flex gap-12 ">
            {data?.data?.map((item, index) => (
              <div key={index}>
                <Card
                  link={`/article/${item?.slug}`}
                  image={`http://localhost:3001/${item?.image?.name}`}
                  title={item?.title}
                  description={item?.metaDescription}
                />
                <Separator className="last:hidden" />
              </div>
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

          <InputSearch dataRandom={randomData} />
        </div>
      </section>
    </main>
  );
}
