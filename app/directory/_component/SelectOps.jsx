import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOps = ({ data, title }) => {
  return (
    <Select>
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
