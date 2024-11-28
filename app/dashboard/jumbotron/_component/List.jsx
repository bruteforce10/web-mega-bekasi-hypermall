import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdDragIndicator } from "react-icons/md";

const List = ({ name, id, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="justify-between flex p-4 bg-gray-100 rounded-md items-center gap-2">
      <div
        ref={setNodeRef}
        className="flex items-center gap-6"
        style={style}
        {...attributes}
        {...listeners}
      >
        <MdDragIndicator className="text-lg" />
        <Image
          src={`http://localhost:3001/${name}`}
          alt="megabekasi-hypermall"
          width={100}
          height={100}
        />
      </div>
      <div className="flex items-center">
        <Button variant="icon" onClick={() => onDelete(id)}>
          <FaTrash className="text-lg text-red-400" />
        </Button>
      </div>
    </div>
  );
};

export default List;
