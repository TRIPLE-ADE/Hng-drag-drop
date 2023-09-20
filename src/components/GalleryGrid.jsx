import { Draggable } from "react-beautiful-dnd";

const GalleryGrid = ({ data, provided }) => {
  return (
    <div {...provided.droppableProps} ref={provided.innerRef}>
      {data.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
               {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <img src={item.img} alt={item.tag} loading="lazy" />
                    </div>
               )}
            </Draggable>
      ))}
    </div>
  );
};

export default GalleryGrid;
