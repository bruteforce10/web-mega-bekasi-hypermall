"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import SideCard from "./SideCard";
import { Button } from "@/components/ui/button";

const InputSearch = ({ dataRandom }) => {
  const [dataSearch, setDataSearch] = React.useState(dataRandom);

  const handleChangeSearch = async (e) => {
    if (e === "") {
      setDataSearch(dataRandom);
      return;
    }

    const response = await fetch(
      `http://localhost:3001/api/v1/cms/articles-search?q=${e}`
    );

    const data = await response.json();
    setDataSearch(data?.data);
  };

  return (
    <aside className="space-y-4 lg:w-1/2 w-full lg:sticky lg:top-[120px] h-fit">
      <div className="relative w-full">
        <IoSearch className="absolute text-2xl left-2 top-[50%] opacity-70 translate-y-[-50%]" />
        <Input
          placeholder="Filter By Keyword"
          className="pl-10 w-full"
          onChange={(e) => handleChangeSearch(e.target.value)}
        />
      </div>

      <h5 className="text-xl uppercase text-[#C82435] font-medium max-lg:hidden">
        Latest Press Release
      </h5>
      {dataSearch?.map((item, index) => (
        <SideCard
          key={index}
          link={item?.slug}
          image={item?.image?.name}
          title={item?.title}
          slug={item?.slug}
        />
      ))}
    </aside>
  );
};

export default InputSearch;
