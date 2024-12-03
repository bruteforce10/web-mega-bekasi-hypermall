"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import EachUtils from "@/utils/EachUtils";
import { visit } from "@/lib/data";
import { usePathname } from "next/navigation";
import titleToSlug from "@/lib/slug";

const Tab = () => {
  const pathname = usePathname();

  return (
    <div className="flex">
      <EachUtils
        of={visit[1]}
        render={(item, index) => (
          <Link
            key={index}
            href={item.link}
            className={cn(
              "p-4 bg-[#F1F5F9] tracking-widest w-full text-center cursor-pointer ",
              pathname.slice(7) === titleToSlug(item.title) &&
                "bg-white cursor-default"
            )}
          >
            {item.title}
          </Link>
        )}
      />
    </div>
  );
};

export default Tab;
