import React from "react";
import ImageSlider from "../_component/ImageSlider";
import TextTitle from "@/components/TextTitle";
import Share from "../_component/Share";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RiCoupon3Fill } from "react-icons/ri";
import Card from "../_component/Card";

export default function DetailPage() {
  return (
    <main className="container mx-auto  lg:mt-12 mt-4 ">
      <div className="flex max-lg:flex-col gap-12">
        <div className="lg:w-1/3 w-full ">
          <ImageSlider />
        </div>
        <div className="space-y-6">
          <TextTitle
            subTitle={"Location East Mall, Level 3"}
            title="Optik Seis"
            className={"text-start mt-0"}
          />
          <div className="space-y-4">
            <p className="leading-loose">
              Welcome to your eyewear haven! Optik Seis is a one-stop fashion
              eyewear center that has been catering to anyone who’s longing to
              see better and be seen better. With an array of collection from
              high-end brands; Cartier, Bvlgari, Chanel, Prada, Gucci, Bottega
              Veneta, Dita, Victoria Beckham, Saint Laurent and more, our
              professionally trained staff will make sure to help you find what
              suits your needs and give a guaranteed of an accurate and correct
              eye examination.
            </p>
            <Link href={"/"} className="block">
              <Button variant="link" className="text-black p-0">
                Visit Website
              </Button>
            </Link>
          </div>
          <Separator />
          <div>
            <Share
              urlEmail={"https://www.google.com"}
              urlTwitter={"https://www.google.com"}
              urlWhatsapp={"https://www.google.com"}
              urlFacebook={"https://www.google.com"}
            />
          </div>
          <Separator />
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Get Offers 🔥</h3>
            <Link
              href={"/"}
              className="block hover:underline hover:text-primary text-xl font-medium"
            >
              <RiCoupon3Fill className="inline mr-2 mb-1" />
              Triple Dining Rewards
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-[120px] space-y-12">
        <h2 className="text-2xl font-bold text-center">
          Other Recommendations
        </h2>
        <div className="w-full flex max-lg:flex-wrap justify-center gap-4">
          {[...Array(4)].map((_, index) => (
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
      </div>
    </main>
  );
}
