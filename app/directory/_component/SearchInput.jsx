"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = ({ value }) => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div className="relative w-full">
      <IoSearch className="absolute text-2xl left-2 top-[50%] opacity-70 translate-y-[-50%]" />
      <Input
        value={value}
        placeholder="Filter By Keyword"
        className="pl-10 w-full"
        onChange={(e) => {
          router.replace(
            `/directory?${new URLSearchParams({
              key: e.target.value,
              category: params.get("category"),
              floorSearch: params.get("floor"),
            })}`,
            { scroll: false }
          );
        }}
      />
    </div>
  );
};

export default SearchInput;
