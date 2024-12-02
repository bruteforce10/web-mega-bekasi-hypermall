"use client";
import React, { useEffect } from "react";
import TextTitle from "./TextTitle";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "@/app/redux/directory/directorySlicer";

const OpeningTenantSection = () => {
  const { articles } = useSelector((state) => state.directory);
  const dispatch = useDispatch();
  const filteredAndSorted = articles
    .filter((item) => item.newsOpening === true)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <section className="bg-cover  lg:bg-right-bottom flex max-md:flex-col bg-no-repeat bg-[url('/bg-opening-tenant.webp')]">
      <Image
        src={`http://localhost:3001/${filteredAndSorted[0]?.image?.name}`}
        alt={"megabekasi-hypermall"}
        width={600}
        className="grow  object-cover max-md:h-[300px] w-full md:w-[400px] lg:max-w-[600px]"
        height={600}
      />
      <div className="flex flex-col max-w-[1200px]  md:px-8 lg:px-12 max-md:py-16 md:justify-center ">
        <TextTitle
          className={"text-white text-center md:text-start mt-0"}
          title={filteredAndSorted[0]?.title}
          subTitle={"Featured News, Store Opening"}
        />
        <div className="flex space-x-2 max-md:justify-center items-center mt-4">
          <Link href={`/article/${filteredAndSorted[0]?.slug}`}>
            <Button>explore</Button>
          </Link>
          <Link href={`/article`}>
            <Button variant={"link"}>discover</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OpeningTenantSection;
