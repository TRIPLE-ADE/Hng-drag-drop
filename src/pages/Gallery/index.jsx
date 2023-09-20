import React, { useState } from "react";
import { SearchInput } from "../../components";
import { galleryData } from "../../constants/data";
import styles from "../../style";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGalleryData, setFilteredGalleryData] = useState(galleryData);

  // Function to handle the search and update the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter the galleryData based on the search term
    const filteredData = galleryData.filter((item) =>
      item.tag.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredGalleryData(filteredData);
  };

  // Function to handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    const srcIndex = result.source.index;
    const destIndex = result.destination?.index || 0;
  
    // Handle index changes from drag
    const reorderedItems = Array.from(filteredGalleryData);
    const [removed] = reorderedItems.splice(srcIndex, 1);
    reorderedItems.splice(destIndex, 0, removed);
  
    setFilteredGalleryData(reorderedItems);
  }

  return (
    <main className={`min-h-screen ${styles.padding} `}>
      <div>
        <h2 className={`${styles.heading2} text-center`}>Gallery</h2>
        <p className={`${styles.paragraph} text-center`}>This is a gallery page that allows users to search for images with tags such as Movie and TV series and also drag and drop to rearrange images.</p>
        <SearchInput onSearch={handleSearch} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="items" key="items">
            {(provided, snapShot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapShot.isDraggingOver}>
                {filteredGalleryData.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} width="100%">
                    {(provided) => (
                      <div 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <img src={item.img} alt={item.id} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </main>
  );
};

export default Gallery;
