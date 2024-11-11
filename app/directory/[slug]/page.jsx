import React from "react";
import ImageSlider from "../_component/ImageSlider";
import TextTitle from "@/components/TextTitle";
import Share from "../_component/Share";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import InnerHTML from "dangerously-set-html-content";
import { RiCoupon3Fill } from "react-icons/ri";
import { IoCall } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import OtherRecomendation from "../_component/OtherRecomendation";

const getData = async (slug) => {
  const res = await fetch(
    `http://localhost:3001/api/v1/cms/directory/${slug}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  return data;
};

export default async function DetailPage({ params }) {
  const { slug } = params;
  const { data } = await getData(slug);
  const { title, location, images, description, phone, instagram } = data;
  console.log(data);

  return (
    <main className="container mx-auto  lg:mt-12 mt-4 ">
      <div className="flex max-lg:flex-col gap-12">
        <div className="lg:w-1/3 w-full ">
          <ImageSlider images={images} />
        </div>
        <div className="space-y-6">
          <TextTitle
            subTitle={location}
            title={title}
            className={"text-start mt-0"}
          />
          <div className="space-y-4">
            <InnerHTML html={description} />
            <div className="flex gap-4">
              <Link
                href={`https://www.instagram.com/${instagram}`}
                className="block"
              >
                <Button variant="outline" className="text-black">
                  <RiInstagramFill className="inline mr-2" />
                  Visit Instagram
                </Button>
              </Link>
              <Link href={`tel:${phone}`} className="block">
                <Button variant="outline" className="text-black">
                  <IoCall className="inline mr-2" />
                  {phone.replace(/(\d{4})(\d{4})(\d{3})/, "$1 $2 $3")}
                </Button>
              </Link>
            </div>
          </div>
          <Separator />
          <div>
            <Share
              urlEmail={`http://localhost:3000/directory/${slug}`}
              urlTwitter={`http://localhost:3000/directory/${slug}`}
              urlWhatsapp={`http://localhost:3000/directory/${slug}`}
              urlFacebook={`http://localhost:3000/directory/${slug}`}
            />
          </div>
          <Separator />
          {/* <div className="space-y-6">
            <h3 className="text-2xl font-bold">Get Offers 🔥</h3>
            <Link
              href={"/"}
              className="block hover:underline hover:text-primary text-xl font-medium"
            >
              <RiCoupon3Fill className="inline mr-2 mb-1" />
              Triple Dining Rewards
            </Link>
          </div> */}
        </div>
      </div>
      <OtherRecomendation />
    </main>
  );
}
