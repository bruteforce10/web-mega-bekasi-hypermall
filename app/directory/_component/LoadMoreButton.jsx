"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const LoadMoreButton = ({ limit }) => {
  const router = useRouter();

  const handleLoadMore = () => {
    const newLimit = Number(limit) + 6;

    router.replace(
      `/directory?${new URLSearchParams({
        limit: newLimit,
      }).toString()}`,
      { scroll: false }
    );
  };

  return (
    <Button onClick={handleLoadMore} className=" mt-8">
      Load More
    </Button>
  );
};

export default LoadMoreButton;
