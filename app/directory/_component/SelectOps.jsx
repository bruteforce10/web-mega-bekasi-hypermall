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
import { name } from "mustache";

const SelectOps = ({ data, title, name }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (value) => {
    if (title === "By Floor") {
      router.replace(
        `/directory?${new URLSearchParams({
          floorSearch: value,
          key: params.get("key") || "",
          category: params.get("category"),
        }).toString()}`,
        { scroll: false }
      );
    } else {
      router.replace(
        `/directory?${new URLSearchParams({
          category: value,
          key: params.get("key") || "",
          floorSearch: params.get("floorSearch"),
        }).toString()}`,
        { scroll: false }
      );
    }
  };

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
