"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SelectOps = ({ data, title, name, limit }) => {
  const router = useRouter();
  const params = useSearchParams();

  const limitPage = params.get("limit") || limit;

  const handleChange = useDebouncedCallback((value) => {
    if (title === "By Floor") {
      router.replace(
        `/directory?${new URLSearchParams({
          floorSearch: value,
          key: params.get("key") || "",
          category: params.get("category") || "",
          limit: limitPage,
        }).toString()}`,
        { scroll: false }
      );
    } else {
      router.replace(
        `/directory?${new URLSearchParams({
          category: value,
          key: params.get("key") || "",
          floorSearch: params.get("floorSearch") || "",
          limit: limitPage,
        }).toString()}`,
        { scroll: false }
      );
    }
  }, 1000);

  return (
    <Select
      onValueChange={handleChange}
      value={
        name === "floor"
          ? params.get("floorSearch") || ""
          : params.get("category") || ""
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item, index) => (
          <SelectItem key={index} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectOps;
