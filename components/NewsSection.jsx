"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const NewsSection = () => {
  return (
    <section className="mt-12 md:mt-24 container mx-auto ">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        effect={"fade"}
        modules={[Pagination, EffectFade]}
        className="mySwiper"
      >
        {[...Array(4)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="flex max-md:flex-col-reverse gap-8 sm:gap-12 px-2 md:pb-8 lg:pb-0">
              <div className="space-y-4 max-md:pb-12">
                <div className="space-y-3">
                  <h4 className="lg:text-xl text-lg font-medium">ARTICLES</h4>
                  <div className="h-1 rounded-full w-8 bg-black" />
                </div>
                <Link
                  href="#"
                  className="lg:text-2xl text-xl block hover:underline uppercase font-bold"
                >
                  Menyambut Musim Liburan, Sweet Icescape 2024 Bersiap Kembali
                  Meriahkan Liburanmu!
                </Link>
                <p className="max-lg:text-sm text-muted-foreground leading-loose">
                  Bertualang menuju alam semesta yang menakjubkan. Serunya lagi,
                  bisa Menyambut musim liburan sekolah tahun ini, Summarecon
                  Mall Kelapa Gading kembali menghadirkan Sweet Icescape bulan
                  Juni 2024!{" "}
                </p>
              </div>

              <Image
                src={"/dummy-news.webp"}
                width={400}
                height={400}
                alt="news-1"
                className="md:max-w-[400px] w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsSection;
