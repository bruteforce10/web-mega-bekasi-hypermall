import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardContact = ({ title, desc, Data, Icon }) => {
  return (
    <Card className="relative">
      <div className="absolute top-0 w-12 h-12 flex items-center justify-center bg-primary rounded-full -right-4 -translate-y-1/2 z-10">
        {Icon}
      </div>
      <CardHeader>
        <CardTitle className="h3 tracking-wider">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>{Data}</CardContent>
    </Card>
  );
};

export default CardContact;
