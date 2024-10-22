import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "./_component/card";
import { categoriesPromo } from "@/lib/data";

const PromoPage = () => {
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
            {[...Array(6)].map((_, index) => (
              <Card key={index} />
            ))}
          </TabsContent>
          <TabsContent value="dinning">not found</TabsContent>
          <TabsContent value="shopping">not found</TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default PromoPage;
