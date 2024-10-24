import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BreadcrumbSection from "../_component/BreadcrumbSection";
import { LuCalendarHeart } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import Share from "@/app/directory/_component/Share";
import Card from "../_component/Card";

export default function PromoDetailPage() {
  return (
    <main className="container mx-auto  lg:mt-12 mt-4">
      <BreadcrumbSection breadTwo="promo" breadThree="Triple Dining Rewards" />
      <section className="flex md:flex-row flex-col gap-8 md:gap-12 mt-4">
        <div className="space-y-4">
          <Image
            src="/dummy-promo.webp"
            alt="megabekasi-hypermall"
            width={1080}
            height={1080}
            quality={100}
            className="w-full rounded-md object-cover "
          />
          <div className="space-y-2 max-md:hidden">
            <h3 className="text-2xl font-bold">
              Gokana Ramen & Teppan Express
            </h3>
            <p className="text-muted-foreground">
              Location : Available on Level 6
            </p>
            <Link href="/promo" className="block">
              <Button variant="link" size="sm" className="text-black p-0 ">
                more detail
              </Button>
            </Link>
          </div>
        </div>
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-4">
            <LuCalendarHeart className="w-12 h-12" />
            <h2 className="text-2xl uppercase font-bold">
              01 Nov 2020 - 31 Aug 2021
            </h2>
          </div>
          <Separator />
          <h1 className="h2">Triple Dining Rewards</h1>
          <p className="text-muted-foreground leading-loose pt-4">
            Makan hemat banyak pilihan dengan promo SUPER MANTAP dari Gokana.
            Mulai dari 40 ribuan aja, kamu udah bisa makan enak dengan 3 pilihan
            menu best seller dari GOKANA dan lengkap dengan minumnya juga!
            Dijamin bikin perut kenyang, dompet tenang. Yuk ke outlet GOKANA
            terdekat dan serbu promonya ya! *Syarat & ketentuan berlaku: Periode
            promo: 16 September - 31 Oktober 2024. Harga belum termasuk pajak.
            Berlaku kelipatan maks. 3 dalam 1 transaksi. Promo berlaku untuk
            dine in, take away, delivery. Promo tidak dapat dibayar dengan
            voucher.
          </p>
          <div className="space-y-2 md:hidden">
            <p className="text-muted-foreground">
              Location : Available on Level 6
            </p>
            <Link href="/promo" className="block">
              <Button variant="link" size="sm" className="text-black p-0 ">
                more detail
              </Button>
            </Link>
          </div>
          <Share
            urlEmail={"https://www.google.com"}
            urlTwitter={"https://www.google.com"}
            urlWhatsapp={"https://www.google.com"}
            urlFacebook={"https://www.google.com"}
          />
        </div>
      </section>
      <div className="mt-[120px] space-y-8">
        <h2 className="text-2xl font-bold text-center">You may also like</h2>
        <div className="flex max-lg:flex-wrap justify-center gap-8">
          {[...Array(4)].map((_, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
