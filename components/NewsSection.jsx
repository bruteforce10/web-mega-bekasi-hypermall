"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArticles,
  setArticleData,
} from "@/app/redux/directory/directorySlicer";

const NewsSection = () => {
  const { articles } = useSelector((state) => state.directory);
  const dispatch = useDispatch();
  const filterArticles = articles
    .filter((item) => item.newsOpening !== true)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  console.log(filterArticles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <section className="mt-12 md:mt-24 container mx-auto ">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={0}
        effect={"fade"}
        fadeEffect={{
          crossFade: true,
        }}
        modules={[Pagination, EffectFade]}
        className="mySwiper"
      >
        {filterArticles.map((article, index) => (
          <SwiperSlide key={index} className="bg-white">
            <div className="flex max-md:flex-col-reverse justify-between gap-8 sm:gap-12 px-2 md:pb-8 lg:pb-0">
              <div className="space-y-4 max-md:pb-12">
                <div className="space-y-3">
                  <h4 className="lg:text-xl text-lg font-medium">ARTICLES</h4>
                  <div className="h-1 rounded-full w-8 bg-black" />
                </div>
                <Link
                  href="#"
                  className="lg:text-2xl text-xl block hover:underline uppercase font-bold"
                >
                  {article.title}
                </Link>
                <p className="max-lg:text-sm text-muted-foreground leading-loose">
                  {article.metaDescription}
                </p>
              </div>

              <Image
                src={`http://localhost:3001/${article.image.name}`}
                width={400}
                height={400}
                alt="news-1"
                className="aspect-video h-[250px] rounded-md object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewsSection;
