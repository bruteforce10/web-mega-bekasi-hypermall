import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import React from "react";
import List from "./List";

const Column = ({ tasks }) => {
  return (
    <div className="space-y-6">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <List key={task.id} title={task.title} id={task.id} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
