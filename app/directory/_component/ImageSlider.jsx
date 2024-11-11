"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, EffectFade, Pagination } from "swiper/modules";

const ImageSlider = ({ images }) => {
  useEffect(() => {
    import("lightbox2/dist/css/lightbox.min.css");
    import("lightbox2/dist/js/lightbox-plus-jquery.min.js");
  }, []);

  return (
    <div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={{
          type: "progressbar",
        }}
        effect="fade"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <a
              href={`http://localhost:3001/${item?.name}`}
              data-lightbox="mygallery"
              data-title={item?.name.slice(17)}
              className="relative"
            >
              <Image
                src={`http://localhost:3001/${item?.name}`}
                alt={item?.name.slice(17)}
                width={500}
                height={500}
                className="rounded-md w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                className="absolute text-white/30 tracking-widest py-0 h-0 hover:text-white text-xl uppercase  left-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2"
              >
                View
              </Button>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
