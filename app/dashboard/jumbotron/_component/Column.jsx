import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import React from "react";
import List from "./List";

const Column = ({ images, onDelete }) => {
  return (
    <div className="space-y-6">
      <SortableContext items={images} strategy={verticalListSortingStrategy}>
        {images.map((image) => (
          <List
            key={image?._id}
            name={image?.name}
            id={image?._id}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
