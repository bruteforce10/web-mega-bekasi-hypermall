import { cn } from "@/lib/utils";
import React from "react";

const Card = ({ icon, title, desc, odd }) => {
  return (
    <div
      className={cn(
        "flex gap-8 mt-8 max-lg:flex-wrap max-lg:justify-center",
        odd ? "flex-row-reverse" : ""
      )}
    >
      {icon}
      <div className="space-y-2">
        <h3 className="h3 text-3xl w-full max-lg:text-center">{title}</h3>
        <p className="text-muted-foreground max-w-[600px] max-lg:text-center">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default Card;
