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

const SelectOps = ({ data, title }) => {
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
          floorSearch: params.get("floor"),
        }).toString()}`,
        { scroll: false }
      );
    }
  };

  return (
    <Select
      onValueChange={handleChange}
      value={params.get(title === "By Floor" ? "floor" : "category") || ""}
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
