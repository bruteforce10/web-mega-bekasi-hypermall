import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "./_component/card";
import { categoriesPromo } from "@/lib/data";

const getData = async () => {
  const res = await fetch(`http://localhost:3001/api/v1/cms/promos`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
};

export default async function PromoPage() {
  const { data } = await getData();
  const filterShopping = data.filter((item) => item.category === "shopping");
  const filterDinning = data.filter((item) => item.category === "dinning");

  return (
    <main>
      <Image
        src="/cover/promo.webp"
        alt="promo-menu-mall-bekasi-hypermall"
        width={1920}
        height={1080}
        quality={100}
        className="h-full min-h-[120px] object-cover w-full"
      />
      <section className="container mx-auto flex justify-center mt-8">
        <Tabs defaultValue="all">
          <TabsList className="mx-auto w-[220px] mb-8">
            {categoriesPromo.map((category, index) => (
              <TabsTrigger key={index} value={category.toLocaleLowerCase()}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value="all"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {data.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                image={item.image.name}
                directory={item.directory.title}
                location={item.location}
                slug={item.slug}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="dinning"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filterDinning.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                image={item.image.name}
                directory={item.directory.title}
                location={item.location}
                slug={item.slug}
              />
            ))}
          </TabsContent>
          <TabsContent
            value="shopping"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filterShopping.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                image={item.image.name}
                directory={item.directory.title}
                location={item.location}
                slug={item.slug}
              />
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
