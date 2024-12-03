import TextTitle from "@/components/TextTitle";
import { Button } from "@/components/ui/button";
import React from "react";

const SectionList = ({ Card, result, title }) => {
  return (
    <div className="flex flex-col items-center gap-12 container mx-auto ">
      <TextTitle
        title={`${result} Result`}
        subTitle={`Showing ${title}`}
        classNameTitle={"text-4xl"}
        classNameSubTitle={"lg:text-sm"}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 mx-auto justify-center gap-8">
        {Card}
      </div>
      <Button className="bg-[#F1F5F9] w-fit my-12 text-black/70 tracking-widest rounded-md">
        More {title}
      </Button>
    </div>
  );
};

export default SectionList;
