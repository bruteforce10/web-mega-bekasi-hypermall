import { visit } from "@/lib/data";
import EachUtils from "@/utils/EachUtils";
import Image from "next/image";
import Tab from "./_components/Tab";
import GoogleMapEmbed from "./_components/MapDirection";

export default async function VisitGettingHerePage() {
  return (
    <main>
      <section>
        <div className="relative">
          <div className="text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
        <Tab />
      </section>
      <GoogleMapEmbed />
    </main>
  );
}
