import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableUser = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const sortStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : "auto",
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className="item" style={sortStyle}>
      <img src={item.img} alt={item.tag} loading="lazy" className="w-full"/>
    </div>
  );
};

export default SortableUser;