import { gettingHere, visit } from "@/lib/data";
import EachUtils from "@/utils/EachUtils";
import Image from "next/image";
import Tab from "./_components/Tab";
import GoogleMapEmbed from "./_components/MapDirection";
import { Separator } from "@/components/ui/separator";
import Card from "./_components/Card";

export default async function VisitGettingHerePage() {
  const { title, data } = gettingHere;
  return (
    <main>
      <section>
        <div className="relative">
          <div className="text-white text-center w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {
              <EachUtils
                of={visit}
                render={(item, _) => (
                  <>
                    <h3 className="h2 tracking-wider max-md:mb-2">
                      {item.title}
                    </h3>
                    <p className="tracking-wider leading-tight">
                      {item.subTitle}
                    </p>
                  </>
                )}
              />
            }
          </div>
          <Image
            src="/cover/about-us.webp"
            alt="promo-menu-mall-bekasi-hypermall"
            width={1920}
            height={1080}
            quality={100}
            className="h-full min-h-[120px] object-cover w-full"
          />
        </div>
      </section>
      <Tab />
      <GoogleMapEmbed />
      <section className="mt-8 container mx-auto  ">
        <h2 className="h2 text-center">{title}</h2>
        <div className="flex flex-col gap-12 items-center py-6 lg:py-12">
          <EachUtils
            of={data}
            render={(item, index) => (
              <>
                <Card key={index} {...item} odd={index % 2 !== 0} />
                <Separator className="last:hidden" />
              </>
            )}
          />
        </div>
      </section>
    </main>
  );
}
