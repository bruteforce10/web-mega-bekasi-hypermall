"use client";
import React, { useRef } from "react";
import TextTitle from "./TextTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const CouponSection = () => {
  const { promos } = useSelector((state) => state.directory);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <section className="bg-cover py-10 md:py-16 bg-center mt-12 md:mt-24 bg-no-repeat bg-[url('/bg-coupon.webp')]">
      <div className="container px-2 mx-auto space-y-12 md:space-y-16">
        <TextTitle
          title={"browse  the latest promo before you shop"}
          className={"text-white mt-0"}
          icon={
            <>
              <Image
                src={"/element-2.svg"}
                alt="megabekasi-hypermall"
                className="absolute -top-2 max-xl:hidden"
                width={60}
                height={60}
              />
              <Image
                src={"/element-2.svg"}
                alt="megabekasi-hypermall"
                className="absolute right-0  -top-4 max-xl:hidden"
                width={60}
                height={60}
              />
            </>
          }
        />
        <div className="relative">
          <button
            ref={prevRef}
            className="absolute top-[38%] translate-y-[-50%]  left-3 z-[2] hover:opacity-90"
          >
            <FaArrowAltCircleLeft className="xl:w-10 xl:h-10  w-8 h-8 text-[#C6C6C6] rounded-full bg-white" />
          </button>
          <button
            ref={nextRef}
            className="absolute z-[2] top-[38%] translate-y-[-50%] right-3 hover:opacity-90"
          >
            <FaArrowAltCircleRight className="xl:w-10 xl:h-10 w-8 h-8 text-[#C6C6C6] rounded-full bg-white" />
          </button>
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.init();
              swiper.navigation.update();
            }}
            modules={[Autoplay, Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            {promos.map((promo, index) => (
              <SwiperSlide key={index}>
                <Link href={`/promo/${promo?.slug}`} className="mx-auto">
                  <Image
                    src={`http://localhost:3001/${promo?.image?.name}`}
                    alt="coupon"
                    width={500}
                    height={500}
                    className="aspect-square object-cover object-center rounded-lg"
                  />
                  <div>
                    <Button className="mt-4 bg-[#FFC89F]/20 rounded-full">
                      {promo?.directory?.title}
                    </Button>
                    <div className="mt-4 spacey-4 text-white ">
                      <h4 className="text-2xl font-medium">{promo?.title}</h4>
                      <p>Location: {promo?.location}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default CouponSection;
